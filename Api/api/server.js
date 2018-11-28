'use strict'
const config = require('./config/config.json');
const service = require('./service.js');

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');

const port = process.env.PORT || 8081;

let app = express();

app.use(cors({
	origin: config.origin
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');

let router = express.Router();

router.post('/timemachine/on', (req, res, next) => {
	service.wakeTimemachine();
	return res.json({ message: 'Wake on Lan requested' });
});

router.post('/timemachine/sleep', (req, res, next) => {
	service.sleepTimemachine();
	return res.json({ message: 'Sleep requested' });
});

router.post('/timemachine/off', (req, res, next) => {
	service.offTimemachine();
	return res.json({ message: 'Shutdown requested' });
});

router.post('/timemachine/restart', (req, res, next) => {
	service.restartTimemachine();
	return res.json({ message: 'Restart requested' });
});

router.get('/timemachine/ison', (req, res, next) => {
	service.isTimeMachineOn().then(isOn => { return res.json({ ison: isOn }); });
});

router.get('/timemachine/isdnsset', (req, res, next) => {
	let isDnsSet = false;
	service.isDnsSet().then(data => {
		if (data.length > 0) {
			isDnsSet = true;
		}

		return res.json({ isdnsset: isDnsSet });

	}).catch(err => {
		console.error(err.stack);
	});
});

router.post('/timemachine/setdns', (req, res, next) => {
	service.toggleDns('set');
	return res.json({ message: 'DNS Override requested' });
});

router.post('/timemachine/resetdns', (req, res, next) => {
	service.toggleDns('reset');
	return res.json({ message: 'DNS Reset requested' });
});

app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);