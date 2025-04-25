# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies inside Docker (this ensures correct native build)
RUN npm install

# Now copy the rest of your backend code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
