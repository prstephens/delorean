// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');
var isReachable = require('is-port-reachable');
var rexec = require('remote-exec');
var request = require('request');
var config = require('./config/config.json');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var hosts = [
	'timemachine.lan'
];

router.post('/timemachine/on', function(req, res, next) {

	var sys  = require('util'),
        exec = require('child_process').exec,
        child;

    	child = exec('sh /home/pi/scripts/wol', function (error, stdout, stderr) 
    	{
        	if (error) // There was an error executing our script
        	{
            	return next(error);
       	 	}

        return res.json({ message: 'Wake on Lan requested' });
    });
});

router.post('/timemachine/sleep', function(req, res, next) {
	var connection_options = {
    		port: 22,
    		username: config.timemachineUsername,
    		password: config.timemachinePassword,
		};
		
	var cmds = [
		'powercfg -hibernate off',
    	'rundll32.exe powrprof.dll,SetSuspendState 0,1,0'
	];

	rexec(hosts, cmds, connection_options);

	return res.json({ message: 'Sleep requested' });
});

router.post('/timemachine/off', function(req, res, next) {
	var connection_options = {
    		port: 22,
    		username: config.timemachineUsername,
    		password: config.timemachinePassword,
    	};

	var cmds = [
		'shutdown /s /f /t 0'
	];

	rexec(hosts, cmds, connection_options);

	return res.json({ message: 'Shutdown requested' });
});


router.get('/timemachine/ison', function(req, res, next) {
	isReachable(3389, {host: 'timemachine.lan'})
	.then(reachable => {
		return res.json({ ison: reachable});
	});
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
