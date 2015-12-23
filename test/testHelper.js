var db = require('./../lib/db.js');
var mongoose = require('mongoose');
var books = mongoose.model('books');

module.exports.removeAllBooks = function(){
	books.remove().exec();
};