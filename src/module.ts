import { resolve } from "path";
import { fileURLToPath } from "url";
import { defineNuxtModule, addPlugin } from "@nuxt/kit";
import { Server } from "socket.io";
import errorOut from "./runtime/errorOut";

export interface ModuleOptions {
  socketFunctions: (io) => void;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-internal-socket",
    configKey: "socketIO",
  },
  defaults: {
    socketFunctions: null,
  },
  async setup(options, nuxt) {
    // Shutdown nuxt server if the socket function is not defined
    if (!options.socketFunctions) {
      errorOut("Please provide the socket function");
      await nuxt.close();
      throw new Error("Please provide the socket function");
    }

    // Hook into the listen hook and add the socket.io instance
    nuxt.hook("listen", (server) => {
      const io = new Server(server);
      options.socketFunctions(io);
    });

    // Add the plugin to the nuxt instance
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);

    addPlugin({
      src: resolve(runtimeDir, "plugin"),
      mode: "client",
    });
  },
});
