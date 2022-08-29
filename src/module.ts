import { fileURLToPath } from "url";
import { defineNuxtModule, addPluginTemplate, createResolver } from "@nuxt/kit";
import { Server } from "socket.io";
import { ManagerOptions } from "socket.io-client";
import errorOut from "./runtime/errorOut";

export interface ModuleOptions {
  socketFunctions: (io) => void;
  clientOptions?: {
    uri?: string;
    managerOptions?: ManagerOptions | {};
  };
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-internal-socket",
    configKey: "socketIO",
  },
  defaults: {
    socketFunctions: () => {},
    clientOptions: {
      uri: "/",
      managerOptions: {},
    },
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

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

    addPluginTemplate({
      src: resolver.resolve("runtime/plugin.mjs"),
      mode: "client",
      options: options.clientOptions,
    });
  },
});
