FROM node:14.17-alpine

WORKDIR /article-app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
#CMD ["node", "dist/index.js"]
CMD ["npm", "run", "start"]
