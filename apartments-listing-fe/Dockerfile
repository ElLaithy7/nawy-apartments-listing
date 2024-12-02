# Step 1: Build Stage
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies first
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all the source files
COPY . .

# Build the Next.js app
RUN npm run build

# Step 2: Production Stage
FROM node:18-slim AS production

# Set working directory for the production stage
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/.next .next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Set the environment to production
ENV NODE_ENV=production

# Start the Next.js app
CMD ["npm", "start"]
