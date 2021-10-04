# Article Service Technical Assessment

## Services
Service | Port | Detail 
------------ | ------------ | -------------
Artice Service| 3001 | using mysql as the main database. The data will also be inserted into elasticsearch
Artice Search Service| 3002 | using elastic search for searchengines, and per article using redis cache


## Working Features
Feature | Type | Route
------------ | ------------- | -------------
Add a new article | POST | http://localhost:3001/articles
Get all articles | GET | http://localhost:3002/articles
Get all articles with query & author params | GET | http://localhost:3002/articles?query=indonesia&author=wahyu
Get all articles with query params | GET | http://localhost:3002/articles?query=indonesia
Get all articles with author params | GET | http://localhost:3002/articles?author=wahyu


## How to use
1. ```docker-compose up --build -d``` 
    <br>Wait until all containers are finished. You can run the command ```docker container ls``` and a list of running containers will appear.
2. Execute migration and seed database with command
    - ```docker-compose exec /bin/sh```
    - inside sh, type ```npm run migrate``` and ```npm run seed``` data will go to mysql and elasticsearch.
