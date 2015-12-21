var render = require("./../lib/render.js");
var db = require('./../lib/db.js');

module.exports.showHome = function *(id){
var bookList = yield db.books.find({});

	this.body = yield render("home", {books: bookList});
};