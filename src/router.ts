import express from "express";
const app = express();
const mongoose = require('mongoose');
const configuration = require('./config.json');
const port = configuration.port;

const model = mongoose.model("users", new mongoose.Schema({
     Users: {
      type: String,
      required: true,
    }
}))


app.get('/', (req: express.Request, res: express.Response) => {
  
    res.status(200).json({ code: res.statusCode });
});

app.get('/users', async(req: express.Request, res: express.Response) => {
    const users = await model.find({}).lean();
    const array: any = [];
    users.forEach((object: any) => {
      array.push(object)
    })
    res.json({ users: array });
});

app.get('/users/:id', async(req: express.Request, res: express.Response) => {
  if(req.params.id){
      const userId = req.params.id.trim();
      const users = await model.findOne({ id: userId }).lean();
      if(!users) return res.send(`User with id: ${userId} does not exist try searching users between 1 - 3`);
      res.send(users);
          }
});

app.get('404', async(req, res) => {
     
    res.status(404).render(`404page`);
})

app.get('*', async(req, res) => {
     
res.status(404).render(`404page`);  
})

module.exports = app;
