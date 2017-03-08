require('dotenv').load();
const express       = require('express'),
      morgan        = require('morgan'),
      bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      cors          = require('cors'),
      secrets       = require('./config/secrets'),
      testdb        = require('./config/testdb'),
      route         = require('./routes');

const port = process.env.PORT || 3333;

/**
 * Connect to MongoDB.
 */
testdb.dbconnect();


/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */

// Force HTTPS on heroku
if(process.env.NODE_ENV === 'production'){
  app.enable('trust proxy');
  app.use (function (req, res, next) {
      if(req.secure) {
        //request was via https, so do no special handling
        next();
      } else {
        //request was via http, so redirect to https
        res.redirect('https://' + req.headers.host + req.url);
      }
  });
}

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true})); //use bodyParser for request and parsing info
app.use(bodyParser.json());

/**
 * Routes Configuration
 */
route(app);


/**
 * Start Express server.
 */
app.listen( port, function(){
  console.log("Developer Centre Server Listening on port ", port );
});