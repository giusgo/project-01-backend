# Build stage
FROM node AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node AS production

# Set working directory
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built files from the build stage
COPY --from=builder /app/dist ./dist

# Copy necessary files for runtime
COPY --from=builder /app/src/config/seed.config.ts ./dist/config/
COPY --from=builder /app/src/utils/seed.ts ./dist/utils/

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]