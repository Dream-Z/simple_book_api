/*
var monk = require('monk');
var wrap = require('co-monk');
var db = monk("localhost/books")

var books = wrap(db.get("books"));
module.exports.books = books;

*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var books = new Schema({
	"title" : String, 
	"author" : String, 
	"year" : Number, 
	"rating" : Number 
});

mongoose.model('books', books);
mongoose.connect('mongodb://localhost/books');

