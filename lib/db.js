var monk = require('monk');
var wrap = require('co-monk');
var db = monk("localhost/simpleApi")

var book_list = wrap(db.get("books"));
module.exports.books = books;

