const express = require("express");
const CharitiesRouter = require('./charities/charity.router');

const app = express();

app.use(express.json());

app.use('/', CharitiesRouter)

const port = process.env.PORT || "3000";

app.listen(port, () => {    
    console.log(`Server Running at ${port} 🚀`);
});