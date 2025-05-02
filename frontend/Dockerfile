# Step 1: Build the Vite React app
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

COPY .env .env 
RUN npm run build


# Step 2: Serve using Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf  # Optional for routing

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
