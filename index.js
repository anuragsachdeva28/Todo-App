const express = require('express');
const app = express();
var PORT = process.env.PORT || 3000;
var todoRoutes = require("./routes/todos");
var bodyParser = require("body-parser");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


app.get('/',(req,res)=>{
  // res.send({data:"cdcdcdvfv"});
  res.send("hello from root routes");
})

app.use('/api/todo', todoRoutes);

app.listen(PORT,function(){
  console.log("Project is running");
})
