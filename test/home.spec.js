var app = require('../app.js');
var request = require('supertest').agent(app.listen());

describe("Home page", function(){
	it("display without errors", function(done){
		request
			.get('/')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(done);
	});
});