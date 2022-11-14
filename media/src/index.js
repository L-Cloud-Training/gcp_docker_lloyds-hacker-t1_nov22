const express = require("express");
const MediaRouter = require('./media/media.router');

const app = express();

app.use(express.json());

app.use('/', MediaRouter)

const port = process.env.PORT || "3000";

app.listen(port, () => {    
    console.log(`Server Running at ${port} 🚀`);
});