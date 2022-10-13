import { useEffect, useMemo, useState } from "react";
import _, { debounce } from "lodash";
import io from "Socket.IO-client";
import axios from "axios";
let socket;

const useDebounce = (cb, ms) => {
  return useMemo(() => debounce(cb, ms), [ms]);
};
const MemesGame = () => {
  const [input, setInput] = useState("");
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await axios.get("/api/testWebSocket");
    socket = io();
    socket.on("connection", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
      console.log(input);
    });
  };
  // const onChangeHandler = (e) => {
  //   console.log("e", e.target.value);
  //   if (e?.target?.value) {
  //     debounce(() => {
  //       setInput(e.target.value);
  //       socket.emit("input-change", e.target.value);
  //     }, 300);
  //   }
  // };
  const onChangeHandler = (e) => {
    console.log("e--", e.target.value);
    const { value } = e.target;
    // debugger;

    setInput(value);
    makeRequest(value);
    // socket.emit("input-change", e.target.value);
    if (e?.target?.value) {
      // changeValue(e.target.value);
      // changeValue();
      // changeValue()
    }
  };

  const makeRequest = useDebounce((val) => {
    socket.emit("input-change", val);

    console.log("input", val);
  }, 1000);
  // useDebounce(onChangeHandler, 300);
  const changeValue = useDebounce(() => {
    // console.log("eeee", e);
    // setInput(e.target.value);

    // setInput(e.target.value);
    socket.emit("input-change", input);
  }, 300);
  const debouncOnxChangeHadnler = debounce((e) => onChangeHandler(e), 300);

  return (
    <>
      <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
        className="px-2 py-2 mx-2 text-lg rounded bg-gray-600 border-red-500"
        type="text"
      />
    </>
  );
};

const getData = async () => {
  let res = await axios.get("api/");
};

export default MemesGame;
