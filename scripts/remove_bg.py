#!/usr/bin/env python3
"""
Background removal script using rembg.
Optimized settings to preserve the full subject without cutting off edges.

Features:
- Alpha matting for smooth, natural edges
- No erosion to prevent subject cutoff
- Post-processing dilation to recover thin/edge foreground details
- Dimension preservation (output always matches input size)

Usage: python3 remove_bg.py <input_path> <output_path>
"""

import sys
import io
from PIL import Image, ImageFilter, ImageChops
from rembg import remove
import numpy as np


def recover_edge_details(alpha_arr: np.ndarray, dilation_radius: int = 2) -> np.ndarray:
    """
    Recover foreground pixels that may have been incorrectly removed
    at thin edges and borders by dilating the alpha mask slightly,
    then only keeping pixels that are near existing foreground.
    """
    alpha_img = Image.fromarray(alpha_arr)
    
    # Dilate the alpha mask to expand foreground boundaries
    dilated = alpha_img.filter(ImageFilter.MaxFilter(size=dilation_radius * 2 + 1))
    dilated_arr = np.array(dilated)
    
    # Create a distance-based mask: only keep dilated pixels that are
    # close to existing foreground (within dilation_radius pixels)
    # This prevents adding false foreground far from the actual subject
    # We use a gentle threshold: keep dilated pixels with alpha > 30
    # where original had at least some alpha, OR where dilated alpha is strong
    recovered = np.where(
        (alpha_arr > 0) | (dilated_arr > 100),  # Keep original + strong dilated
        np.maximum(alpha_arr, dilated_arr),
        alpha_arr
    )
    
    # Smooth the result to avoid harsh edges from dilation
    recovered_img = Image.fromarray(recovered.astype(np.uint8))
    recovered_img = recovered_img.filter(ImageFilter.GaussianBlur(radius=1))
    result = np.array(recovered_img)
    
    # Ensure we don't reduce existing foreground opacity
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

    # Get input dimensions for verification
    input_img = Image.open(io.BytesIO(input_data))
    input_w, input_h = input_img.size

    # Remove background with optimized settings:
    # - alpha_matting=True: produces smoother, more natural edges
    # - alpha_matting_erode_size=0: NO erosion, preserves full subject (no cutoff)
    # - alpha_matting_foreground_threshold=250: includes more of the subject
    # - alpha_matting_background_threshold=10: excludes more of the background
    # - post_process_mask=False: raw mask, we do our own post-processing
    output_data = remove(
        input_data,
        alpha_matting=True,
        alpha_matting_foreground_threshold=250,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=0,
        post_process_mask=False,
    )

    output_img = Image.open(io.BytesIO(output_data))

    # Ensure output dimensions match input
    if output_img.size != (input_w, input_h):
        # Create canvas with input dimensions and paste output
        canvas = Image.new("RGBA", (input_w, input_h), (0, 0, 0, 0))
        # Resize output to match input
        output_img = output_img.resize((input_w, input_h), Image.LANCZOS)

    # Post-process: recover thin foreground edges that may have been cut
    arr = np.array(output_img)
    if arr.shape[2] == 4:  # RGBA
        alpha = arr[:, :, 3]
        recovered_alpha = recover_edge_details(alpha, dilation_radius=2)
        arr[:, :, 3] = recovered_alpha
        output_img = Image.fromarray(arr, "RGBA")

    # Save as PNG (preserves alpha channel)
    with open(output_path, "wb") as f:
        output_img.save(f, format="PNG", optimize=True)

    print("done")


if __name__ == "__main__":
    main()
