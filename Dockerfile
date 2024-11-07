FROM node:14.17.0 AS production

ENV NODE_ENV=production

COPY package.json .
COPY tsconfig.json .

RUN npm install typescript@4.1.6 -g
RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run start: production"]

EXPOSE 3001
