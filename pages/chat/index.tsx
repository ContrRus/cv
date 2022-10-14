import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import io from "socket.io-client";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

let socket;
const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [userEntered, setUserEntered] = useState(false);
  const [value, setValue] = useState("");
  // const socket: any = useRef();
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState("");

  const { t } = useTranslation();

  useEffect(() => {}, []);

  // https://cv-project-server.herokuapp.com/

  const connect = () => {
    //ws://localhost:5000
    socket.current = new WebSocket("wss://cv-project-server.herokuapp.com/");
    setUserEntered(true);
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
    socket.current.onmessage = (event: any) => {
      // console.log("event socket.current.onmessage", event);

      const message = JSON.parse(event.data);

      setMessages((prev: any) => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log("connection is closed");
    };
    socket.current.onerror = () => {
      console.log("Error ");
    };
  };

  const connectUser = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.emit("user-connect", JSON.stringify(userName));
    setConnected(true);

    setUserEntered(true);
    // socket.on("connection", (msg) => {
    //   console.log("msg",msg);
    // });
    socket.on("user-connected", (msg) => {
      console.log("msg", msg);

      setMessages((currentMessages) => [JSON.parse(msg), ...currentMessages]);
    });

    socket.on("send-message", (msg) => {
      setMessages((currentMessages) => [JSON.parse(msg), ...currentMessages]);
    });
  };

  const sendMessage = async (event) => {
    if (value) {
      const message = {
        userName,
        message: value,
        id: Date.now(),
        event: "message",
      };
      socket.emit("send-message", JSON.stringify(message));
      // socket.current.send(JSON.stringify(message));
      setValue("");
    }
  };

  if (!connected) {
    return (
      <div
        className={`${styles["main-backgorund-inverse"]} container lg:max-w-screen-lg max-w-lg h-screen `}
      >
        <h1 className="text-5xl font-bold text-white py-2 text-center pt-4 mb-6">
          {t("Welcome_Chat")}
        </h1>

        <div className=" w-full flex justify-center  items-center">
          <div className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-2 text-center  ">
              <h1 className="text-3xl font-bold mb-8">{t("Log_In_Please")} </h1>
            </div>
            <div className="mb-4">
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && connectUser()}
                type="text"
                placeholder={t("Enter_your_name")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6 text-center">
              <button
                disabled={userEntered}
                onClick={connectUser}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  userEntered && "cursor-not-allowed opacity-50"
                } `}
              >
                {t("Log_In")}
              </button>
            </div>
            {userEntered && (
              <div className="flex justify-center">
                <Image src="/spinner.svg" width={30} height={30}></Image>
              </div>
            )}
          </div>
        </div>
        <p className="text-center text-3xl text-white mx-auto w-1/2 mb-10">
          {t("Chat_Description")}
        </p>
      </div>
    );
  }
  return (
    <div
      className={`${styles.mainBackgorund} lg:max-w-screen-lg max-w-lg h-screen mx-auto flex justify-center`}
    >
      <div>
        <h1 className="text-5xl text-white font-bold py-2 text-center mt-10 mb-6">
          {t("Simple_Chat")}
        </h1>
        <div className="flex flex-wrap flex-row justify-center">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
            type="text"
            className="mt-10 shadow appearance-none border rounded w-full py-2 px-3  leading-tight  outline-mainBlue mb-2"
            placeholder={t("Enter_your_message")}
          />
          <button
            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={sendMessage}
          >
            {t("Send")}
          </button>
        </div>
        <div
          className={`${styles["custom-scroll"]}  max-h-96 max-w-md flex-column overflow-scroll`}
        >
          {messages.map((message) => (
            <div key={message.id} className={`${styles["custom-scroll"]} `}>
              {message.event === "connection" ? (
                <div
                  style={
                    message.userName === userName
                      ? { background: "white" }
                      : { background: "lightBlue" }
                  }
                  className={`${styles["custom-scroll"]} border text-black py-2 px-3 mb-2 rounded `}
                >
                  <p>
                    {t("User")} {message.userName} {t("Connected")}
                  </p>
                </div>
              ) : (
                <div
                  style={
                    message.userName === userName
                      ? { background: "white" }
                      : { background: "lightBlue" }
                  }
                  className={`${styles["custom-scroll"]}  border text-black py-2 px-3 mb-2 rounded custom-scroll`}
                >
                  <p className="break-words">
                    <b>{message.userName}</b> : {message.message}
                  </p>
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
