import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../config/swagger.json";

const options: swaggerUi.SwaggerOptions = {
    explorer: false
};

export const handleAPIDocs = (router: Router) => {
  router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
}