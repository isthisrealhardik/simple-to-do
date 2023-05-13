const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')

// middlewares
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect to the mongodb 
const uri = process.env.MONGO_URL
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to the db'))
    .catch(err => console.error(err))

    
// schema and model
const todoSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  });

const Todo = mongoose.model('List', todoSchema);

// api routes

app.get('/', (req, res) => {
    res.send('good morning')
})

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    } catch (err) {
        console.error(err)
    }
})

app.post('/todos', async (req, res) => {
    try {
        const { text, completed } = req.body;
        const todo = new Todo({ text: text, completed: completed })
        const toDB = await todo.save()
            .then(res => console.log('todo added to the db'))
            .catch(err => console.error('error adding the todo to the db', err))
        res.json(toDB)
    } catch (err) {
        console.log(err)
    }
})

// server live
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`server live at https://localhost:${port}`)
})