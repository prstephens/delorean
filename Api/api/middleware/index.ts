import {
    handleCors,
    handleBodyRequestParsing,
    handleHttpHeaders
  } from "./common";

  import { applyLogger } from "../utils/";
  import { handleAPIDocs } from "./apiDocs";

  export default [
    handleCors,
    handleBodyRequestParsing,
    handleHttpHeaders,
    applyLogger,
    handleAPIDocs
  ];
