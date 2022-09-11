import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ChatComponent from "./chat";
import CvPage from "./cv";
import SnakeGame from "./snake-game";

const Home: NextPage = () => {
  return (
    <>
      <Head>
       
        <title>Ruslan CV</title>
        <meta
          name="description"
          content="Personal CV project by Ruslan Shiyanov"
        />
        <link rel="icon" href="/main-page.ico" />
      </Head>

      {/* <SnakeGame></SnakeGame> */}
      {/* <ChatComponent></ChatComponent> */}
      <CvPage></CvPage>
    </>
  );
};

export default Home;
