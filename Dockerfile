FROM node:22-alpine3.19

COPY  package.json /app/
COPY  src /app/
COPY .env .env

WORKDIR /app

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3306

CMD ["npm","start"]