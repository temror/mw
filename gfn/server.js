const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const corsOptions = {
    origin: "http://localhost:8001"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
const db = require("./models");/*
db.role.create({id:1,name:"user"})
db.role.create({id:2,name:"admin"})*/
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
