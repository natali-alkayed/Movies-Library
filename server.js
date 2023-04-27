'use strict';
const express = require("express");
const data = require('./Movie Data/data.json');
const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());
/////////////////////////////////////////////////////
app.get("/", (req, res) => {
    let result = [];
function Movies(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
    result.push(this);
}
 let movies=  new Movies(data.title, data.poster_path,data.overview);
    res.json(movies);
})
//////////////////////////////////////////////////
app.listen(port, () => {
    console.log(`server is listing on port ${port}`);
});
//////////////////////////////////////////////////
app.get('/favorite', favoriteHandler)

function favoriteHandler(req, res) {

    res.send('Welcome to Favorite Page');
}
/////////////////////////////////////////////////
app.use(notFoundHandler);
function notFoundHandler(req, res) {
    res.status(404).send("page not found error");
}
//////////////////////////////////////////////////
function handleServerError(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  }

  app.use(handleServerError);


