import { defineNuxtPlugin } from "#app";
import { Manager } from "socket.io-client";

/// Add socket client to nuxt instance
export default defineNuxtPlugin((nuxtApp) => {
  const params = <%= JSON.stringify(options || {}, undefined, 2) %>;
  const manager = new Manager(params.uri, params.managerOptions);
  const io = manager.socket("/");
  return {
    provide: {
      io,
    },
  };
});
