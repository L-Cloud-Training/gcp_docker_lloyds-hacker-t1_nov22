const express = require("express");
const UsersRouter = require('./users/users.router');
var morgan = require('morgan');

const app = express();

app.use(express.json());

app.use(morgan('combined'));

app.use('/', UsersRouter)

const port = process.env.PORT || "3000";

app.listen(port, () => {    
    console.log(`Server Running at ${port} 🚀`);
});