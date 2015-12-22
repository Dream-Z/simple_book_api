var app = require('../app.js');
var request = require('supertest').agent(app.listen());
var db = require('./../lib/db.js');
var co = require('co');
var should = require('should');
var mongoose = require('mongoose');


describe("Home page", function(){
	it("display without errors", function(done){
		request
			.get('/')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(done);
	});

	it("list all books in the database", function (done) {
		var fn = co.wrap(function* () {
		  	yield db.books.insert({title: "New book", author: "test author", year: 2000, rating: 15});
			yield db.books.insert({title: "Old book", author: "old author", year: 1980, rating: 35});
		});
		 
		fn(true).then(function (done) {
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
});


/*

co(function *(){
		yield db.books.insert({title: "New book", author: "test author", year: 2000, rating: 15});
		yield db.books.insert({title: "Old book", author: "old author", year: 1980, rating: 35});

		request
			.get("/")
			.expect(200)
			.expect(function(res){
				res.text.should.containEql("New book");
				res.text.should.containEql("Old book");
			})
			.end(done);
					
		})();

*/