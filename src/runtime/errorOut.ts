import boxen from "boxen";
import chalk from "chalk";

export default function (error: string) {
  console.error(
    boxen(
      `
      ${chalk.red(`
        ${chalk.bold("Error:")} ${error}
      `)}
       ${chalk.green(`
       1. Create a new file anywhere in your poject root:`)} 

        ${chalk.bold("mkdir")} sockets && ${chalk.bold(
        "touch"
      )} sockets/index.ts

        ${chalk.green(
          `2. Export default function that accepts an io instance:`
        )} 

        ${chalk.bold("import { Server } from 'socket.io';")}

        ${chalk.bold("export default function")} (io: Server) {
            // Do spmething...
        }

       ${chalk.green(` 3. Add the plugin to your nuxt.config.js:`)} 

        ${chalk.bold("import functions from './sockets/index';")}

        socketIO: {
          socketFunctions: functions,
        },
        `,
      {
        padding: 1,
        margin: 1,
        borderStyle: "double",
        dimBorder: true,
        title: "Socket Function Required",
        titleAlignment: "center",
      }
    )
  );
}
