FROM node:14.17-alpine

WORKDIR /usr/src/article-search-service
COPY package*.json ./
RUN npm install
RUN npm install -g pm2
COPY . .

EXPOSE 9200
EXPOSE 3002
CMD ["pm2-runtime", "start", "src/index.js"]
