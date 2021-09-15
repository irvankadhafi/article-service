FROM node:14.17-alpine

WORKDIR /article-service
COPY package*.json ./
RUN npm install
RUN npm install -g pm2

COPY . .

EXPOSE 3001
## Add the wait script to the image
#ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
#RUN chmod +x /wait
#RUN /wait
#RUN npm run migrate
#RUN npm run seed

#CMD ["npm", "run", "start"]
CMD ["pm2-runtime", "start", "src/index.js"]
#CMD ["pm2", "src/index.js"]
#CMD ["node", "dist/index.js"]
#CMD ["npm", "run", "start"]
