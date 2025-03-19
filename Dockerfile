FROM node:18-alpine

RUN apk add --no-cache make gcc g++ python3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]