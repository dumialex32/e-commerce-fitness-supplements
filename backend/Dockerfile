# Stage 1: Build the application
FROM node:20 AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript into JavaScript
RUN npm run build

# Stage 2: Production image
FROM node:20

WORKDIR /usr/src/app

# Copy only the compiled JavaScript files and production dependencies
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "dist/server.js"]