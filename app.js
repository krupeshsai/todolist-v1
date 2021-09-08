const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();


app.set('view engine', 'ejs');
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static("public"));

 mongoose.connect('mongodb://localhost:27017/todolistdb', {useNewUrlParser: true, useUnifiedTopology: true});

 const itemScheme = {
   name : String
 };

 const Item = mongoose.model("Item " , itemScheme );

 const item1 = new Item({ name: "Welcome to to do list"});
 const item2 = new Item({ name: " Hit the + button to add a new item"});
 const item3 = new Item({ name: " <-- Hit this to delete a item"});
 const defaultItems = [item1,item2, item3];

 Item.insertMany(defaultItems , function(err){
   if(err){console.log(err);}
   else{console.log("Successfully inserted");}
 });

app.get("/", function(req, res) {

  let  today = new Date();
  let options ={
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US" , options);

  res.render("list", {kindOfDay: day , newListItem:items});
});

app.post("/" , function(req,res){

let item = req.body.newItem;

items.push(item);
res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server Started on port 3000")
});
