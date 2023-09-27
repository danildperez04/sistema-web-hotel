const http = require('http');
require('dotenv').config({});

const app = require('./src/app');

const { port, host } = require('./src/config/config');
const db = require('./src/db');

const server = http.createServer(app);

server.listen(port, host, async ()=>{
  try{
    await db.authenticate();
    console.log('Connected to [DB]');
    
    await db.sync({force: true});

    console.log(`Server listening on port ${port}`);
  }catch (error){
    console.error(error);
  }
});