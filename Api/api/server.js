var config = require('./config/config.json');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var isReachable = require('is-port-reachable');
var wol = require('wol');
var rexec = require('remote-exec');

var port = process.env.PORT || 8081;
var timeMachinePassword = process.env.TM_PASS;

app.use(cors({
	origin: config.origin
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

var hosts = [
	config.timemachineHostname
];

router.post('/timemachine/on', function (req, res, next) {
	wol.wake(config.timemachineMAC, function (err, res) {
		console.log(res);
	});

	return res.json({ message: 'Wake on Lan requested' });
});

router.post('/timemachine/sleep', function (req, res, next) {
	var connection_options = {
		port: 22,
		username: config.timemachineUsername,
		password: timeMachinePassword,
	};

	var cmds = [
		'powercfg -hibernate off',
		'rundll32.exe powrprof.dll,SetSuspendState 0,1,0'
	];

	rexec(hosts, cmds, connection_options);

	return res.json({ message: 'Sleep requested' });
});

router.post('/timemachine/off', function (req, res, next) {
	var connection_options = {
		port: 22,
		username: config.timemachineUsername,
		password: timeMachinePassword,
	};

	var cmds = [
		'shutdown /s /f /t 0'
	];

	rexec(hosts, cmds, connection_options);

	return res.json({ message: 'Shutdown requested' });
});

router.post('/timemachine/restart', function (req, res, next) {
	var connection_options = {
		port: 22,
		username: config.timemachineUsername,
		password: timeMachinePassword,
	};

	var cmds = [
		'shutdown /r /f /t 0'
	];

	rexec(hosts, cmds, connection_options);

	return res.json({ message: 'Restart requested' });
});

router.get('/timemachine/ison', function (req, res, next) {
	isReachable(3389, { host: config.timemachineHostname })
		.then(reachable => {
			return res.json({ ison: reachable });
		});
});

router.post('/timemachine/setdns', function (req, res, next) {
	var connection_options = {
		port: 22,
		username: config.timemachineUsername,
		password: timeMachinePassword,
	};

	var cmds = ['netsh interface ipv4 add dnsservers lan 208.67.222.123',
		'netsh interface ipv4 add dnsservers lan 208.67.220.123'];

	rexec(hosts, cmds, connection_options);
	
	return res.json({ message: 'DNS Override requested' });
});

router.post('/timemachine/resetdns', function (req, res, next) {
	var connection_options = {
		port: 22,
		username: config.timemachineUsername,
		password: timeMachinePassword,
	};

	var cmds = [
		'netsh interface ip set dns lan dhcp'
	];

	rexec(hosts, cmds, connection_options);

	return res.json({ message: 'DNS Reset requested' });
});

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

