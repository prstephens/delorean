import {
    handleCors,
    handleBodyRequestParsing,
  } from "./common";

  import { applyLogger } from "../utils/";

  export default [
    handleCors,
    handleBodyRequestParsing,
    applyLogger
  ];
