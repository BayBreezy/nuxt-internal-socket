import { defineNuxtConfig } from "nuxt";
import socketModule from "..";
import functions from "./sockets/index";

export default defineNuxtConfig({
  modules: [socketModule],
  socketIO: {
    socketFunctions: functions,
    socketFunctionPath: "sockets/index.ts",
  },
});
