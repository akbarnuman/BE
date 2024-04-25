const express=require('express');
const mongoose=require('mongoose');
const path=require("path");
require('dotenv').config();


const app=express();
const PORT=3002;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://akbarnuman009:numan009@cluster0.a2etnth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connect to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

//user schema 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String

});
const User =mongoose.model('User', userSchema);



app.post('/user', (req, res) =>{
    const user=new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(400).json({ message: err.message
    }));
});