import express from "express";
import path from "path";
const mongoose = require('mongoose');
const configuration = require('./config.json');
const app = express();
const port = configuration.port;
const routers = require('./router');
const ejs = require('ejs');

mongoose.connect(configuration.databaseURL, { 
  useNewUrlParser: true, 
  useFindAndModify: true, 
  useUnifiedTopology: true 
}, async(error: any, info: any) =>{
    if(error) throw error;
    if(configuration.debug) console.log(`[DATABASE] Connected and listening at ${configuration.databaseURL}`);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use((req, res, next) => {
  if(configuration.debug) console.log(`User requested at endpoint ${req.path ? `http://localhost:${port}${req.path}` : `http://localhost:${port}`}`)
  next();
})

app.use(routers);

app.listen(port, () => {
  if(configuration.debug) console.log(`[ Server ] Application listening at http://localhost:${port}`)
});
