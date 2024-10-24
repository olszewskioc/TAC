# Dockerfile for Simple Frontend

# Step 1: Use an official nginx image as base
FROM nginx:alpine

# Step 2: Remove the default nginx html content
RUN rm -rf /usr/share/nginx/html/*

# Step 3: Copy your single index.html file to nginx's html directory
COPY ./index.html /usr/share/nginx/html/

# Step 4: Expose port 80
EXPOSE 80

# Step 5: Start nginx
CMD ["nginx", "-g", "daemon off;"]
