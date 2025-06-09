FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY package*.json tsconfig*.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/src ./src

EXPOSE 4000

CMD ["npm", "run", "start:dev"]