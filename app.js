const express = require("express");
const path = require("path");
const fs = require("fs");
const http = require("http");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dance', {useNewUrlParser: true, useUnifiedTopology: true});

const bodyparser = require('body-parser');


const port = 80;

app.use('/static', express.static('static'));  // To bring the static folder to the exprss 

app.use(express.urlencoded());

app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are just connecting ourself by using the mongoose ...");
});

//  The process to make a Schema.. So far so good. We've got a schema with two properties, name and Role, these will be a String.
var kittySchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    problem: String
  });

var contactdata = mongoose.model('contactdata', kittySchema);

// var subhajitketty = new Kittenn({ name: ' Subhajit Das ', Role: 'I e founded by me' });


app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=> {
  var re = req.body;
  console.log(re);
  var myData = new contactdata(req.body);
  myData.save().then(()=>{
      res.render('contact')
  }).catch(()=> {
      res.status(400).send('item is not saved to the database.......')
  })
})


// app.get('/', (req, res)=>{
//     const it = 'If the written sentence is printed by the browser then I will recognise that the port is ok ....';
//     res.send(it);
// })




// To start the server in the loclahost
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



// To connect the mongo database we have to use the Mongoose 

// It is the process to connect the mongodb with the nodejs using the mongoose .

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/newdataof', {useNewUrlParser: true, useUnifiedTopology: true})

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("We are just connecting ourself by using the mongoose ...");
// });


//  The process to make a Schema.. So far so good. We've got a schema with two properties, name and Role, these will be a String.
// var kittySchema = new mongoose.Schema({
//   name: String,
//   Role: String
// });

//  To log the 'kittySchema' into the 'kitten' named mondle... Then we can not change the model ..
// Difference between Schema and Modle::
// Schema: We can decide what will be the data ,, and which type of data will be in it..
// Model :: It is the compiled form of the Schema .. Now we can not change the form of the Schema..


// NOTE: methods must be added to the schema before compiling it with mongoose.model()
// kittySchema.methods.speak = function () {
//   const greeting = `My name is` + this.name;
  // console.log(greeting);
// }


// It will make a collection named 'kittens' in the test named database .. It appends the 's' letter with the collection name automaticly
// var Kittenn = mongoose.model('subhajitcodes', kittySchema);

// var subhajitketty = new Kittenn({ name: ' Subhajit Das ', Role: 'I e founded by me' });

// console.log(subhajitketty.name);
// subhajitketty.speak();


//  To save the subhajitdetty in the subhajitcodes collection which is in the test database ..
// subhajitketty.save(function (err, fluffy) {
//   if (err) return console.error(err);
  // fluffy.speak();
// })


// To find the datas which are stored in the subhajitcodes named collection
contactdata.find(function (err, contactdatas) {
  if (err) return console.error(err);
  console.log(contactdatas);
})