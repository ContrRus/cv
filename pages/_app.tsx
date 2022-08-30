import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBarComponent from "../components/navbar/navbar.component";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBarComponent></NavBarComponent>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
