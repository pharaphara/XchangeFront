# Stage 1
FROM node:16-alpine as build-step

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app

RUN npm install

COPY . /app
RUN ng serve
EXPOSE 4200
# Stage 2


