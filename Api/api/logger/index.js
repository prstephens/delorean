'use strict'
const winston = require('winston');

const logger = winston.createLogger({
	level: 'info',
	handleExceptions: true,
	maxsize: 5242880, // 5MB
	maxFiles: 5,
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json(),
	),

	transports: [
		//
		// - Write to all logs with level `info` and below to `combined.log` 
		// - Write all logs error (and below) to `error.log`.
		//
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log' })
	],

	exitOnError: false, // do not exit on handled exceptions

});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.simple()
		)
	}));
}

// for use with morgan 
logger.stream = {
	write: (message, encoding) => {
		logger.info(message.trim());
	}
};

module.exports = logger;