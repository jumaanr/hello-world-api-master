# First Stage: Build Stage
FROM node:18.20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the entire application source code
COPY . .

# Compile the TypeScript code
RUN npm run build

# Second Stage: Production Stage
FROM node:18.20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install only production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the compiled app from the builder stage
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Set the command to run the application
CMD ["node", "dist/app.js"]