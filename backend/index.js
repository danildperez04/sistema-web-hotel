const http = require('http');
require('dotenv').config({});

require('./src/models/role');
require('./src/models/reservation');

const app = require('./src/app');

const { port, host } = require('./src/config/config');
const db = require('./src/db');

const server = http.createServer(app);

server.listen(port, host, async ()=>{
  try{
    await db.authenticate();
    console.log('Connected to [DB]');
    
    await db.sync({});

    console.log(`Server listening on port ${port}`);
  }catch (error){
    console.error(error);
  }
});