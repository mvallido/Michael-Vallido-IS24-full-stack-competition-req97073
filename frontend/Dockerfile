FROM node:18

# Set the working directory to /app
WORKDIR /app/frontend

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app source code to the container
COPY . .

# Build the app
RUN npm run build

# Create a new image from the base node image
FROM node:18

# Set the working directory to /app
WORKDIR /app/frontend

# Copy the build directory from the previous stage
COPY --from=0 /app/frontend/build ./build
# Copy node_modules from previous stage
COPY --from=0 /app/frontend/node_modules ./node_modules

# Expose port 8080 for serving the app
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
