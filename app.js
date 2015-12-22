var app = module.exports = require('koa')();
var route = require('koa-route');
var serve = require('koa-static');

app.use(serve('./public'));

var homeRoutes = require('./routes/homeRoutes.js');
app.use(route.get('/', homeRoutes.showHome));

var bookRoutes = require('./routes/bookRoutes.js');
app.use(route.get('/book', bookRoutes.showNewBook));
app.use(route.post('/book', bookRoutes.addNewBook));
app.use(route.get('/book/:id', bookRoutes.showBook));
app.use(route.post('/book/:id', bookRoutes.updateBook));
app.use(route.get('/book/remove/:id', bookRoutes.removeBook));


app.listen(3000);
console.log('Server is started at port 3000');
