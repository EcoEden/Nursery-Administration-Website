# Step 1: Build the React app
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve using Nginx
FROM nginx:alpine

# Clean old nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from React app
COPY --from=build /app/build/ /usr/share/nginx/html/

# Copy custom nginx config (optional, uncomment if you have it)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
