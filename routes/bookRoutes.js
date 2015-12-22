var render = require('./../lib/render.js');
var parse = require('co-body');
var db = require('./../lib/db.js');
var mongoose = require('mongoose');
var books = mongoose.model('books');


module.exports.showNewBook = function *(){
	this.body = yield render('newBook');
};

module.exports.showBook = function *(id){
	var fnd = yield books.findById(id);
	if (!fnd) this.throw('cant find book by id');
	this.body = yield render('showBook', {book : fnd});
};

module.exports.updateBook = function *(id){
	var postedData = yield parse(this);
	var conditions = {_id : id}
	var bookToStore = {
		title : postedData.bookTitle,
		author : postedData.bookAuthor,
		year : postedData.bookYear,
		rating : postedData.bookRating
	};
	var options = { multi : true };
	
	yield books.update(conditions, bookToStore, options);
	this.redirect('/');
};

module.exports.addNewBook = function *(){
	var postedData = yield parse(this);

	var storeBook = new books ({
		title : postedData.bookTitle,
		author : postedData.bookAuthor,
		year : postedData.bookYear,
		rating : postedData.bookRating
	});

	var insert = yield storeBook.save();

	this.redirect('/');
};