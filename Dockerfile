FROM node:14.17.0
COPY package.json .
COPY tsconfig.json .
RUN npm cache clean --force
RUN npm install typescript@4.1.6 -g
RUN npm install
COPY . ./
RUN npm run build
CMD ["sh", "-c", "npm run start"]
EXPOSE 3001
