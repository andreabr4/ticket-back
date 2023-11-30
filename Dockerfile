# Step 1: Use a Node.js base image
FROM node:latest as builder

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Step 2: Use a smaller base image for the production build
FROM node:latest

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
