# Use Node.js image as the base image
FROM node:16

# Set the working directory for your app inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend source code into the container
COPY . .

# Install TypeScript and ts-node for running TypeScript code
RUN npm install --save-dev typescript ts-node ts-node-dev

# Expose the port your app will run on
EXPOSE 8080

# Run the TypeScript server entry point (e.g., app.ts)
CMD ["npx", "ts-node", "src/app.ts"]
