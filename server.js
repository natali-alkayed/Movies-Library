'use strict';
require("dotenv").config();
const express = require("express");
const data = require('./Movie Data/data.json');
const app = express();
const cors = require('cors');
app.use(cors());
const axios = require("axios");
const MoovieKey = process.env.API_KEY;
const port = process.env.PORT;
/////////////////////////////////////////////////////
app.listen(port, () => {
    console.log(`server is listing on port ${port}`);
});
////////////////////////////////////////////////////////
app.get("/", handleHome);
app.get("/trending", handleTrending);
app.get("/search", handleSearching);
app.get('/favorite', favoriteHandler);
app.get('/companies',handleCompanies);
app.get('/reviews',handleReviews);
app.use(notFoundHandler);
app.use(handleServerError);
////////////////////////////////////////////////////////
function Movies(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}
///////////////////////////////////////////////////////
function handleHome(req, res) {
    let movie = new Movies(data.id, data.title, data.release_date, data.poster_path, data.overview);
    res.json(movie);
}
/////////////////////////////////////////////////////////////////////////////////////////
function favoriteHandler(req, res) {
    res.send('Welcome to Favorite Page');
}
//******************************//
function notFoundHandler(req, res) {
    res.status(404).send("page not found error");
}
function handleServerError(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
}
//********************************//
async function handleTrending(req, res) {
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${MoovieKey}&language=en-US`;

    let moviesFromAPI = await axios.get(url);
    let movies = moviesFromAPI.data.results.map((item) => {
        return new Movies(item.id, item.title, item.release_date, item.poster_path, item.overview);
    })
    res.send(movies);
}
//**********************************//
async function handleCompanies (req,res){
    const companyId = req.query.companyId;
const url = `https://api.themoviedb.org/3/company/${companyId}?api_key=${MoovieKey}`;
let companyData = await axios.get(url);
res.send(companyData.data);
}
//*********************************//
function handleSearching(req, res) {
    //the query from the frontend
    const movieName = req.query.name;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${MoovieKey}&language=en-US&query=${movieName}`;
    axios.get(url)
        .then((result) => {
            console.log(result.data);
            res.send(result.data.results.map((item) => {
                return new Movies(item.id, item.title, item.release_date, item.poster_path, item.overview);
            }))
        })
}
//************************************//
async function handleReviews(req,res){
    const reviewId = req.query.reviewId;
    const url = `https://api.themoviedb.org/3/review/${reviewId}?api_key=${MoovieKey}`;
    let reviewData = await axios.get(url);
    // let review = new MoviesReview(reviewData.data.id, reviewData.data.author, reviewData.data.url,reviewData.data.rating,reviewData.data.content,reviewData.data.date);
    res.send(reviewData.data);
}// try this to test: 58aa82f09251416f92006a3a
////////////////////////////////////////////////////////////////////////////////////////////////////