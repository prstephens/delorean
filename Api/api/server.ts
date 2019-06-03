import middleware from "./middleware";
import { logger } from "./middleware/logger";
import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./services";
import express from "express";
import config from "config";

const port = process.env.PORT || 8081;

process.on("uncaughtException", e => {
	logger.error(e);
	process.exit(1);
  });
  
  process.on("unhandledRejection", e => {
	logger.error(e as string);
	process.exit(1);
  });
  
let app = express();

// apply the middleware:
// cors
// bodyParser
// Winston logging
applyMiddleware(middleware, app);
applyRoutes(routes, app);

app.disable('x-powered-by');

// START THE SERVER
// =============================================================================
app.listen(port);
logger.info('Magic happens on port %s', port);