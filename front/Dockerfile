# Dockerfile for Frontend

# Step 1: Use an official nginx image as base
FROM nginx:alpine

# Step 2: Copy the frontend files into nginx's html directory
COPY ./dist /usr/share/nginx/html

# Step 3: Expose port 80
EXPOSE 80

# The nginx image already has a CMD to run the server
