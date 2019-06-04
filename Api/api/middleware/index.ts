import {
    handleCors,
    handleBodyRequestParsing,
  } from "./common";

  import { applyLogger } from "../utils/";
  import { handleAPIDocs } from "./apiDocs";

  export default [
    handleCors,
    handleBodyRequestParsing,
    applyLogger,
    handleAPIDocs
  ];
