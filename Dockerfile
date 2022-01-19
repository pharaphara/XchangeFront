# Stage 1
FROM node:16-alpine as build-step

RUN mkdir -p /app
WORKDIR /app
COPY package.json /app

RUN npm install
EXPOSE 4200
COPY . /app
RUN npm run build --prod
# Stage 2

FROM nginx:1.20.2-alpine

COPY --from=build-step /app/docs /usr/share/nginx/html
EXPOSE 4200
