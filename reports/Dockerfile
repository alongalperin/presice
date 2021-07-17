FROM node:14.16.0-alpine3.10

WORKDIR /app

COPY ./package.json .

COPY ./package-lock.json .

RUN npm i

COPY ./ .

RUN npm run build

CMD ["node", "build/index.js"]
