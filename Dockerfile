FROM node:14.17.0 AS production

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run start: production"]

EXPOSE 3001