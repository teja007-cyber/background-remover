# Single-stage Dockerfile for Next.js + Python (rembg)
# Simple, reliable approach using next start instead of standalone server
FROM python:3.11-slim

# Install Node.js 20
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js dependencies
COPY package.json bun.lock* ./
RUN npm install

# Copy source and build
COPY . .

# Ensure robots.txt exists with correct content (allows Google indexing) BEFORE build
# so the standalone output includes it
RUN printf 'User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /_next/\n\nSitemap: https://background-remover-ucpa.onrender.com/sitemap.xml\n' > public/robots.txt

RUN npx prisma generate
RUN npm run build

# Create necessary directories
RUN mkdir -p db

# Also create robots.txt in the standalone output to ensure it's included
RUN mkdir -p .next/standalone/public && cp public/robots.txt .next/standalone/public/robots.txt 2>/dev/null || true

ENV NODE_ENV=production

EXPOSE 10000

# Use shell form so $PORT env var is expanded at runtime
CMD npx next start -p $PORT
