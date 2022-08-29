import { defineNuxtPlugin } from "#app";
import { io as sio} from "socket.io-client";

/// Add socket client to nuxt instance
export default defineNuxtPlugin((nuxtApp) => {
  const params = <%= JSON.stringify(options || {}, undefined, 2) %>;
  const io = sio(params.uri,params.managerOptions);
  return {
    provide: {
      io,
    },
  };
});
