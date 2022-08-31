import dynamic from "next/dynamic";

const SnakeGamePage = dynamic(
  () => {
    return import("../../components/snake-game/snake-game.component");
  },
  { ssr: false }
);

export default SnakeGamePage;
