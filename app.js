var app = module.exports = require('koa')();
var route = require('koa-route');
var serve = require('koa-static');

app.use(serve(__dirname + "/public"));

var homeRoutes = require("./routes/homeRoutes.js");
app.use(route.get('/', homeRoutes.showHome));



app.listen(3000);
console.log("Server is started at port 3000");
