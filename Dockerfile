FROM node:14.15-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN mkdir ./src
COPY . .

EXPOSE 3000

CMD ["node", "./src/server.js"]
