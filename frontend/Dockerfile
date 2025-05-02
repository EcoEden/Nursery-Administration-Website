# Step 1: Build the Vite React app
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all other files and build the app
COPY . ./

# Copy the .env file
COPY .env .env

# Build the React app using Vite
RUN npm run build


# Step 2: Serve using Nginx
FROM nginx:alpine

# Remove the default Nginx HTML content
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the previous step to the Nginx folder
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Optionally, copy your custom Nginx config (make sure nginx.conf exists)
COPY nginx.conf /etc/nginx/nginx.conf  # Optional for routing

# Expose port 80 for the web server
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
