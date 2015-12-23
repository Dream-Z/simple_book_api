var app = require('../app.js');
var request = require('supertest').agent(app.listen());
var db = require('./../lib/db.js');
var co = require('co');
var should = require('should');
var mongoose = require('mongoose');
var books = mongoose.model('books');
var testHelper = require('./testHelper.js');


describe("Home page", function(){

	beforeEach(function(done){
		testHelper.removeAllBooks();
		done();
	});

	afterEach(function(done){
		testHelper.removeAllBooks();
		done();
	});

	it("display without errors", function(done){
		request
			.get('/')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(done);
	});

	it("list all books in the database", function (done) {
		new books({title: "New book", author: "test author", year: 2000, rating: 15}).save();
		new books({title: "Old book", author: "old author", year: 1980, rating: 35}).save();
		
		request
			.get("/")
			.expect(200)
			.expect(function(res){
				res.text.should.containEql("New book");
				res.text.should.containEql("Old book");
			})
			.end(done);
		});
	});

