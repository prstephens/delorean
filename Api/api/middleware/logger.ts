import winston from "winston";

export const logger = winston.createLogger({
	level: 'info',
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
		new winston.transports.File({ filename: 'logs/error.log', level: 'error', handleExceptions: true }),
		new winston.transports.File({ filename: 'logs/combined.log' })
	],

	exitOnError: true, // do not exit on handled exceptions

});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		level: 'debug',
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.simple()
		)
	}));
};

// for use with morgan 
export class LoggerStream {
	write(message: string) {
		logger.info(message.trim());
	};
};