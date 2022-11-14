const express = require("express");
const PostRouter = require('./post/post.router');

const app = express();

app.use(express.json());

app.use('/', PostRouter)

const port = process.env.PORT || "3000";

app.listen(port, () => {    
    console.log(`Server Running at ${port} 🚀`);
});