# CISC3140_LAB5

This lab will display all the JSON.file and it prompts user to insert record and update it. The 
data will stored in `database.db` file when data send from client side and recieved by server side.

## Environment
mongodb: version > 5

node: version > 16

## Backend setup
setup mongodb
```shell
mongod --dbpath data --logpath log/mongod.log --logappend
```

setup server
```shell
npm install
node server.js
```
## Frontend setup
```shell
// install a simple http server
npm i -g http-server
// Start an http service for the frontend page
hs -c-1 -p 3001
```
