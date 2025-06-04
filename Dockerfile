FROM node:22-alpine

EXPOSE 4000

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npx tsc

CMD ["node", "dist/main.js"]