ARG NODE_VERSION=19-alpine3.16
FROM node:${NODE_VERSION}

EXPOSE 8080
RUN apk update && apk add bash

WORKDIR /usr/src/app/pages
WORKDIR ..

COPY . .

RUN npm install
RUN npm add express
RUN npm install mysql
RUN npm add body-parser
RUN npm install react-router-dom
RUN npm install cors

CMD ["/bin/bash"]



