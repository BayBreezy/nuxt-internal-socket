import { Server, Socket } from "socket.io";

export default function (io: Server) {
  io.on("connection", (socket: Socket) => {
    socket.on("send message", (data) => {
      socket.broadcast.emit("new message sent", data);
    });
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
