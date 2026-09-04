FROM node:24-alpine

WORKDIR /webWorkdir

COPY package*.json /webWorkdir

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]