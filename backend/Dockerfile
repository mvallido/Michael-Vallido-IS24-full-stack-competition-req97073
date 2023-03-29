FROM node:18

# Set the working directory to /app/backend
WORKDIR /app/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the app source code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the app using nodemon
CMD ["npm", "run", "dev"]
