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

# Expose port 8080 for serving the app
EXPOSE 8080

# Install serve to run the app
# RUN npm install -g serve

# Start the app
CMD ["npm", "start"]
