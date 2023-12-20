# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.9.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# install nodemon for hot-reloading
# RUN npm install -g nodemon

RUN npm install

# Copy all the files in the project 
COPY . .

RUN npm run build

# STAGE 2 - Nginx
FROM nginx:1.17.1-alpine
# Copy nginx configuration file 
COPY nginx.conf /etc/nginx/nginx.conf

# Copy project's dist to nginx html dir
COPY dist/ibkr-dashboard-standalone /usr/share/nginx/html
