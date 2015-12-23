var app = require('../app.js');
var request = require('supertest').agent(app.listen());
var db = require('./../lib/db.js');
var co = require('co');
var should = require('should');
var mongoose = require('mongoose');
var books = mongoose.model('books');
var testHelper = require('./testHelper.js');

describe("Book site", function(){
	var test_book = {title: "New book", author: "test author", year: 2000, rating: 15};
	var test_book_2 = {title: "book_2", author: "test_author2", year: 2011, rating: 115};
	var test_book_3 = {title: "bookkkkkkkk", author: "test_author2", year: 2011, rating: 115};

	beforeEach(function(done){
		testHelper.removeAllBooks();
		done();
	});

	afterEach(function(done){
		testHelper.removeAllBooks();
		done();
	});

	it("Home page: display without errors", function(done){
		request
			.get('/')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(done);
	});

	it("Home page: list all books in the database", function (done) {
		new books(test_book).save();
		new books(test_book_2).save();
		
		request
			.get('/')
			.expect(200)
			.expect(function(res){
				res.text.should.containEql("New book");
				res.text.should.containEql("book_2");
			})
			.end(done);
	});

	it("Edit page: display without errors", function(done){
		new books(test_book).save();
		
		books.find({title: 'New book'}, function(err, data){
			if(err) throw err;
			else {
				var id = data[0]._id;
				var get_link = '/book/'+ id;
				request
					.get(get_link)
					.expect(200)
					.expect('Content-Type', /html/)
					.expect(function(res){
						res.text.should.containEql("New book");
					})
					.end(done);
			}
		});
	});

	it("Edit page: functionality works properly", function(done){
		new books(test_book).save();
		
		books.find({title: 'New book'}, function(err, data){
			if(err) throw err;
			else {
				var id = data[0]._id;
				var get_link = '/book/'+ id;
				request
					.get(get_link)
					.send({title : 'strange title', author : 'strange author', year : 2013, rating: '200'})
					.expect(200)
					.end(function(err, res){
						var string = JSON.stringify(res);
						if (string.indexOf('strange title') > -1)
							done();
					});
				}
		});
	});

	it("New book page: display without errors", function(done){
		request
			.get('/book')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(done);
	});

	it("Error page: display without errors", function(done){
		request
			.get('/asdasd')
			.expect(200)
			.expect('Content-Type', /html/)
			.expect(function(res){
				res.text.should.containEql("Sorry, you're insert invalid url");
			})
			.end(done);
	});

	it("Delete book: successfuly deleted", function(done){
		new books(test_book_3).save();
		
		books.find({title: 'bookkkkkkkk'}, function(err, data){
			if(err) throw err;
			else {
				var id = data[0]._id;
				var get_link = '/book/remove/'+ id;
				request
					.get(get_link)
					.expect('Content-Type', /html/)
					.end(function(err, res){
						if(err) throw err;
						else done();
					})
				}
		});
	});

});
