FROM node:18.20.3-alpine3.18

WORKDIR /app

COPY ./package*.json ./
RUN npm install --legacy-peer-deps
ENV PORT=4000

COPY . .
CMD ["npm","run","start"]