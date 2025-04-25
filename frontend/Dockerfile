# Step 1: Build the Vite React app
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN VITE_API_URL=$VITE_API_URL npm run build


# Step 2: Serve using Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# ✅ Correct path for Vite output
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Optional: use custom nginx config
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
