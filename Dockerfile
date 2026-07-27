# Multi-stage Dockerfile for Next.js + Python (rembg)
# Stage 1: Install dependencies
FROM python:3.11-slim AS deps

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

# Stage 2: Build
FROM deps AS builder

COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# Stage 3: Production
FROM python:3.11-slim AS production

# Install Node.js 20 and runtime dependencies
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Python dependencies from deps stage
COPY --from=deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=deps /usr/local/bin/python3 /usr/local/bin/python3

# Copy Node.js dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy built Next.js app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/next.config.ts ./

# Copy Prisma generated client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the Next.js server
CMD ["node", ".next/standalone/server.js"]
