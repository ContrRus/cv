import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket: any = useRef();
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {}, []);

  // const sendMessage = async () => {
  //   await axios.post()
  // }
  // https://cv-project-server.herokuapp.com/

  const connect = () => {
    //ws://localhost:5000
    socket.current = new WebSocket("ws://cv-project-server.herokuapp.com/");

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        userName,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
      console.log("Connection is established");
    };
    socket.current.onmessage = (event:any) => {
      console.log("event socket.current.onmessage", event);

      const message = JSON.parse(event.data);

      setMessages((prev:any) => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log("connection is closed");
    };
    socket.current.onerror = () => {
      console.log("Error ");
    };
  };

  const sendMessage = async (event) => {
    // await axios.
    console.log("event on sendMessage", event);

    const message = {
      userName,
      message: value,
      id: Date.now(),
      event: "message",
    };

    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  if (!connected) {
    return (
      <div className={`${styles["main-backgorund"]} mt-10 bg-green`}>
        <h1 className="text-5xl font-bold py-2 text-center mt-0 mb-6">
          Welcome to Chat
        </h1>
        <div className=" w-full flex justify-center  items-center">
          <div className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-2 text-center  ">
              <h1 className="text-3xl font-bold mb-8">Please login</h1>
            </div>
            <div className="mb-4">
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && connect()}
                type="text"
                placeholder="Enter your name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6 text-center">
              <button
                onClick={connect}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`${styles.mainBackgorund} w-full flex justify-center`}>
      <div>
        <h1 className="text-5xl font-bold py-2 text-center mt-10 mb-6">
          Simple Chat
        </h1>
        <div className="flex flex-wrap flex-row justify-center">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
            type="text"
            className="mt-10 shadow appearance-none border rounded w-full py-2 px-3 text-green-700 leading-tight  outline-green-500 mb-2"
            placeholder="Enter your message"
          />
          <button
            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
        <div className="max-h-96 max-w-md flex-column overflow-scroll">
          {messages.map((message) => (
            <div key={message.id}>
              {message.event === "connection" ? (
                <div
                  style={
                    message.userName === userName
                      ? { background: "white" }
                      : { background: "lightBlue" }
                  }
                  className="border text-black py-2 px-3 mb-2 rounded "
                >
                  User {message.userName} connected
                </div>
              ) : (
                <div
                  style={
                    message.userName === userName
                      ? { background: "white" }
                      : { background: "lightBlue" }
                  }
                  className=" border text-black py-2 px-3 mb-2 rounded"
                >
                  <b>{message.userName}</b> : {message.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
