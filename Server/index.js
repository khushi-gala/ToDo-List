const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors({
  origin: 'https://to-do-list-frontend-sigma.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true  // Enable credentials (cookies, authorization headers) cross-origin
}));

app.use(express.json())

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err =>  res.status(500).json(err))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    // console.log(id);
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err =>  res.status(500).json(err))
})

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err =>  res.status(500).json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete(id)
    .then(result => {
      if (!result) {
        console.log(`No document found with ID: ${id}`);
        return res.status(404).json({ error: 'Document not found' });
      }
      console.log(`Successfully deleted document: ${result}`);
      res.json(result);
    })
    .catch(err => {
      console.error(`Error deleting document: ${err}`);
      res.status(500).json({ error: 'An error occurred while deleting the document' });
    });
})
app.listen(3002, ()=> {
    console.log("Server is running at 3002")
})
