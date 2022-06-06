# Nuxt Internal Socket

Nuxt module that hooks into the `listen` hook and creates a socket.io connection.

## Why use this module?

You an use this modulke if you want socket functionality in your application but dont want to create a separate socket.io server.

## How to use this module?

Follow these steps to get started

- **Install the module**

```bash
npm install nuxt-internal-socket
```

- **Add it to yor nuxt.config file**

```js
export default defineNuxtConfig({
  modules: ["nuxt-internal-socket"],
});
```

- **Create your socket function file**

```bash
mkdir sockets && touch sockets/index.ts
```

- **Create your socket function**

```js
import { Server, Socket } from "socket.io";

export default function (io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("socket connected", socket.id);
    socket.on("join room", (room) => {
      socket.join(room);
    });
    socket.on("disconnect", (reason) => {
      console.log("socket disconnected");
      io.emit("user disconnected", socket.id);
    });
  });
}
```

- **Add your socket function to the nuxt.config file & pass params to the module**

```js
import { defineNuxtConfig } from "nuxt";
import functions from "./sockets/index";

export default defineNuxtConfig({
  modules: ["nuxt-internal-socket"],
  socketIO: {
    socketFunctions: functions,
  },
});
```

## What this module does?

This module will hook into the `listen` hook and create a socket.io connection.

You can access the socket client instance through the `useNuxtApp` composable withing your application.

```ts
// get socket from nuxt instance
const { $io } = useNuxtApp();
```

The in a function you can use the socket client to emit events to the server.

```js
$io.emit("event", { data: "hello" });
```
