FROM node:24-alpine

WORKDIR /webWorkdir

COPY package*.json /webWorkdir

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]