# Use the official Node.js 18 image
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Build the SvelteKit app
RUN pnpm run build

# Set the command to start the app
CMD ["node", "./build"]
