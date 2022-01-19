# Stage 1
FROM node:16-alpine as build-step

RUN mkdir /home/vagrant/app
WORKDIR /home/vagrant/app
COPY package.json app

RUN npm install

COPY . /home/vagrant/app
RUN npm run build --prod
# Stage 2

FROM nginx:1.20.2-alpine

COPY --from=build-step /home/vagrant/app/docs /usr/share/nginx/html

EXPOSE 80


