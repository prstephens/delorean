import { Router} from "express";
import cors from "cors";
import parser from "body-parser";
import config from "config";

export const handleCors = (router: Router) => {
  router.use(cors({
	    origin: config.get('origin')
    }));
};

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleHttpHeaders = (app: any) => {
  app.disable('x-powered-by');
};