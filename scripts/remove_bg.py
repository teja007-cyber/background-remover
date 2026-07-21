#!/usr/bin/env python3
"""
Background removal script using rembg.
Uses input padding to prevent edge cutoff, and post-processing to recover
foreground details that the model may trim at image borders.

Usage: python3 remove_bg.py <input_path> <output_path>
"""

import sys
import io
from PIL import Image, ImageFilter, ImageChops
from rembg import remove
import numpy as np


PAD_PIXELS = 30  # Padding added around the input image before processing


def pad_image(img: Image.Image, pad: int) -> tuple[Image.Image, int, int, int, int]:
    """
    Pad the image on all sides with replicated border pixels.
    This gives the model context beyond the image edges so it doesn't
    clip the subject at the borders.
    Returns the padded image and the crop box (left, top, right, bottom).
    """
    w, h = img.size
    # Create a new canvas with padding, filled by extending edge pixels
    padded = Image.new(img.mode, (w + 2 * pad, h + 2 * pad))
    # Fill padding area by pasting edge strips
    # Center the original
    padded.paste(img, (pad, pad))
    # Left edge strip
    left_strip = img.crop((0, 0, 1, h))
    for x in range(pad):
        padded.paste(left_strip, (x, pad))
    # Right edge strip
    right_strip = img.crop((w - 1, 0, w, h))
    for x in range(pad, pad + pad):
        padded.paste(right_strip, (w + pad + (x - pad), pad))
    # Top edge strip (full width including corner fills)
    top_strip = padded.crop((0, pad, w + 2 * pad, pad + 1))
    for y in range(pad):
        padded.paste(top_strip, (0, y))
    # Bottom edge strip
    bottom_strip = padded.crop((0, h + pad - 1, w + 2 * pad, h + pad))
    for y in range(h + pad, h + 2 * pad):
        padded.paste(bottom_strip, (0, y))

    # Crop box for later: (left, top, right, bottom)
    crop_box = (pad, pad, pad + w, pad + h)
    return padded, *crop_box


def recover_edge_details(alpha_arr: np.ndarray, dilation_radius: int = 3) -> np.ndarray:
    """
    Recover foreground pixels that may have been incorrectly removed
    at thin edges and borders by dilating the alpha mask slightly,
    then only keeping pixels that are near existing foreground.
    """
    alpha_img = Image.fromarray(alpha_arr)

    # Dilate the alpha mask to expand foreground boundaries
    dilated = alpha_img.filter(ImageFilter.MaxFilter(size=dilation_radius * 2 + 1))
    dilated_arr = np.array(dilated)

    # Keep: original foreground + strong dilated regions near existing foreground
    recovered = np.where(
        (alpha_arr > 0) | (dilated_arr > 80),
        np.maximum(alpha_arr, dilated_arr),
        alpha_arr
    )

    # Smooth the result to avoid harsh edges from dilation
    recovered_img = Image.fromarray(recovered.astype(np.uint8))
    recovered_img = recovered_img.filter(ImageFilter.GaussianBlur(radius=1.5))
    result = np.array(recovered_img)

    # Ensure we never reduce existing foreground opacity
    result = np.maximum(result, alpha_arr)

    return result.astype(np.uint8)


def main():
    if len(sys.argv) < 3:
        print("Usage: python3 remove_bg.py <input_path> <output_path>", file=sys.stderr)
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]

    # Read input image
    with open(input_path, "rb") as f:
        input_data = f.read()

    input_img = Image.open(io.BytesIO(input_data))
    # Convert to RGB if necessary (rembg handles RGBA but padded canvas works best in RGB)
    if input_img.mode not in ("RGB", "RGBA"):
        input_img = input_img.convert("RGB")

    input_w, input_h = input_img.size

    # === KEY FIX: Pad the input image before processing ===
    # This prevents the model from cutting off the subject at image edges
    padded_img, crop_l, crop_t, crop_r, crop_b = pad_image(input_img, PAD_PIXELS)

    # Convert padded image to bytes for rembg
    padded_buf = io.BytesIO()
    padded_img.save(padded_buf, format="PNG")
    padded_data = padded_buf.getvalue()

    # Remove background on the padded image
    # alpha_matting for smoother edges, erode_size=0 to avoid subject erosion
    output_data = remove(
        padded_data,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=0,
        post_process_mask=False,
    )

    output_img = Image.open(io.BytesIO(output_data)).convert("RGBA")

    # Crop back to original dimensions (remove the padding)
    output_img = output_img.crop((crop_l, crop_t, crop_r, crop_b))

    # Ensure output dimensions match input exactly
    if output_img.size != (input_w, input_h):
        output_img = output_img.resize((input_w, input_h), Image.LANCZOS)

    # Post-process: recover thin foreground edges
    arr = np.array(output_img)
    if arr.shape[2] == 4:  # RGBA
        alpha = arr[:, :, 3]
        recovered_alpha = recover_edge_details(alpha, dilation_radius=3)
        arr[:, :, 3] = recovered_alpha
        output_img = Image.fromarray(arr, "RGBA")

    # Save as PNG (preserves alpha channel)
    with open(output_path, "wb") as f:
        output_img.save(f, format="PNG", optimize=True)

    print("done")


if __name__ == "__main__":
    main()
