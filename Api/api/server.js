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
	service.isTimeMachineOn().then(isOn => { 
			return res.json({ ison: isOn }); 
	});
});

router.get('/timemachine/dns/which', (req, res, next) => {
	service.getDnsProvider().then(provider => {
		console.log(provider);
		return res.json({ whichdns: provider });
	});
});

router.post('/timemachine/dns/set/:provider', (req, res, next) => {
	let provider = req.params.provider;

	service.setDns(provider);
	return res.json({ message: 'DNS Override requested' });
});

router.post('/timemachine/dns/reset', (req, res, next) => {
	service.resetDns();
	return res.json({ message: 'DNS Reset requested' });
});

app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);