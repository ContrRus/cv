import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  // res: NextApiResponse<any>
  res: any
) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;
  io.on("connection", (socket) => {
    console.log("connecting");
    socket.on("user-connect", (userName) => {
      console.log("data in user-connect", JSON.parse(userName));
      const name = JSON.parse(userName);
      const message = `connected`;
      io.emit(
        "user-connected",
        JSON.stringify({
          userName: name,
          message,
          id: Date.now(),
          event: "connection",
        })
      );
    });
    socket.on("send-message", (msg) => {
      const { userName, message, id } = JSON.parse(msg);

      io.emit("send-message", JSON.stringify({ message, userName, id }));
    });
  });
  console.log("setting up socket");
  res.end();
}
