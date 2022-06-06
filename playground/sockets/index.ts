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
