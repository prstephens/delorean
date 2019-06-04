import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../config/swagger.json";

const options = {
    explorer: false
};

export const handleAPIDocs = (router: Router) => {
  router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
}