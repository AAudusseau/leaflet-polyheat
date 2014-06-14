// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express

var assets = require('./assets.json');

var port = process.env.PORT || 3000;

// define static files
app.use(express.static(__dirname + '/app'));

// define views folder
app.set('views', __dirname + '/app/views');

// set template engine
app.set('view engine', 'jade');

// main route
app.get('/', function(req, res){
  res.render('index', {
    assets: assets
  });
});

// Start the server
app.listen(port);
console.log('Magic happens on port ' + port);
