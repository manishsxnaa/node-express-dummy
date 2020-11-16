const express = require("express");
const path = require("path")
const app = express();
var exphbs  = require('express-handlebars');
//const logger = require("./middleware/logger");
const members = require("./Members");

//Init logger
//app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get all members
// app.get('/api/members',(req,res)=> res.json(members));

// //Get single member 
// app.get('/api/members/:id',(req,res)=> {
//     const found = members.some(member => member.id === parseInt(req.params.id));

//     if(found) {
//         res.send(members.filter(member => member.id === parseInt(req.params.id)));
//     } else {
//         res.status(400).json({msg:`No member found id of ${req.params.id}`});
//     }
// });


//Homepage Route
app.get('/',(req,res) => res.render('index', {
    title : "Member App",
    members: members
}));

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Member Api routes
app.use('/api/members', require('./router/api/member'));

// Send file
// app.get('/',(req,res) => {
//     res.sendfile(path.join(__dirname,"public","index.html"));
// });

const PORT = process.env.PORT || 5000;
//var production = process.env.NODE_ENV === 'production'

app.listen(PORT,() => console.log(`Server running on port ${PORT}`));