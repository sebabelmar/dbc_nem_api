// BASE SETUP
// =============================================================================

// load the packages we are going to use
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose 	 = require('mongoose')
var Movie 		 = require('./app/models/movie')

// mongo shell connection: $ mongo ds061365.mlab.com:61365/dbc_node_api -u dbc_student -p dbcmean
// conecting to MongoLab via mongo url
mongoose.connect('mongodb://dbc_student:dbcmean@ds061365.mlab.com:61365/dbc_node_api') 


// in order to proces data from POST requests
// configure 'app' to use the package bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              					// get an instance of the express Router docs: http://expressjs.com/en/guide/routing.html
var DIAGNOSIS_MESSAGE = 'Server working as expected'	// constante to send as 



// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('We can log data out :D');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api/v1)
router.get('/diagnose', function(req, res) {
    res.json({ port: port, message: DIAGNOSIS_MESSAGE });   
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/movies')

    // create a movie (accessed at POST http://localhost:8080/api/movies)
    .post(function(req, res) {
    	console.log(req.body)
        
        var movie = new Movie();      // create a new instance of the movie model
        movie.name = req.body.name;  // set the movies name (comes from the request)
        movie.year = req.body.year;  // set the movies year (comes from the request)

        // save the movie and check for errors
        movie.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Movie created!', movie: movie });
        });
        
    })

    // get all the movies (accessed at GET http://localhost:8080/api/movies)
    .get(function(req, res) {
        Movie.find(function(err, movies) {
            if (err)
                res.send(err);

            res.json(movies);
        });
    }); 

// REGISTER OUR ROUTES WITH PREFIX -------------------------------
// all of our routes will be prefixed with /api/version 
// we are thinking that your application shares the same domain as your public api
app.use('/api/v1', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on port: ' + port);
