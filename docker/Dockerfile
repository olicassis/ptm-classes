FROM node:20-alpine

RUN apk add --no-cache curl

WORKDIR /src

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
