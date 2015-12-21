var app = module.exports = require('koa')();
var route = require('koa-route');
var render = require("./lib/render.js");


//var userRoutes = require("./userRoutes.js");
app.use(route.get('/', showHome));

function *showHome(id){
	this.body = yield render("home");
};

app.listen(3000);
console.log("Server is started at port 3000");