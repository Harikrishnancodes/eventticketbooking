const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const db = require('./config/db');
const bodyParser = require("body-parser");
;


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); 
    res.header('Access-Control-Allow-Credentials', 'true'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 
  
    if (req.method === 'OPTIONS') {
      
      res.sendStatus(200);
    } else {
      next();
    }
  });


app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT || 3000;



const userrouter = require('./router/userRouter');

db(()=>{
    try {
        console.log("DataBase Successfully Connected");        
    } catch (error) {
        console.log("Database Not Connected : ", error);    
    }});
    
    app.use('/',userrouter);


const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  description: String,
  location:String,
  price:Number,
});

const Event = mongoose.model('Event', eventSchema);

app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

app.post('/events', async (req, res) => {
 
  const event = new Event({
    name: req.body.name,
    date: req.body.date,
    description: req.body.description,
    price:req.body.price,
  }) ;;

  try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error adding the event' });
  }
});

app.delete('/events/:eventId', async (req, res) => {
  try {
    const removedEvent = await Event.findByIdAndRemove(req.params.eventId);
    if (removedEvent) {
      res.json({ message: 'Event deleted' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the event' });
  
  }
});
    
    const PORT = 8000;
    app.listen(PORT,()=> console.log("server Started @ 8000 "));
