FROM node:18-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 3000

COPY . .

CMD npm run dev