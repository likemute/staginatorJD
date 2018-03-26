FROM node:9.9-alpine
MAINTAINER Alexey Andreev <alexey.andreev@anywayanyday.com>
WORKDIR /usr/src/app
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
COPY ./package.json /usr/src/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json
COPY ./node_modules /usr/src/app/node_modules
RUN npm install
COPY . /usr/src/app/
CMD ["node", "app.js"]