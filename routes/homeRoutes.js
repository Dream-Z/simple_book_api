var render = require("./../lib/render.js");
var db = require('./../lib/db.js');

var mongoose = require('mongoose');
var books = mongoose.model('books');

module.exports.showHome = function *(id){
//var bookList = yield db.books.find({});
var bookList = yield books.find({});

	this.body = yield render("home", {books: bookList});
};