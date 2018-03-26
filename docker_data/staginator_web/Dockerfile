FROM node:9.9-alpine as node_cc
MAINTAINER Alexey Andreev <alexey.andreev@anywayanyday.com>
WORKDIR /usr/src/app
COPY ./package*.json ./
COPY ./node_modules ./node_modules
RUN npm install
COPY . .
RUN npm run generate

# build runtime image
FROM nginx:alpine
COPY --from=node_cc /usr/src/app/dist /usr/share/nginx/html
COPY ./nginx_server.config /etc/nginx/conf.d/default.conf