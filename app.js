const express = require('express')

// express app
const app = express();
const PORT = process.env.PORT || 3000;

// register view engine
app.set('view engine','ejs');
app.set('views','./src/views');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"));

//routes
app.use(require("./src/routes/teacherLogin"))
app.use(require("./src/routes/studentLogin"))
app.use(require("./src/routes/index"))
app.use(require("./src/routes/studentRecords"))
app.use(require("./src/routes/studentLogin"))
app.use(require("./src/routes/addStudentResult"))
app.use(require("./src/routes/editStudentResult"))
app.use(require("./src/routes/searchResult"))

app.listen(PORT);