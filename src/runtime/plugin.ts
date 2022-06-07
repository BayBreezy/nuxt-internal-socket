import { defineNuxtPlugin } from "#app";
import socket from "socket.io-client";

/// Add socket client to nuxt instance
export default defineNuxtPlugin((nuxtApp) => {
  const io = socket("/");
  return {
    provide: {
      io,
    },
  };
});
