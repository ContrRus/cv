import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBarComponent from "../components/navbar/navbar.component";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import transaltions from "../translations/translations.json";

i18n.use(initReactI18next).init({
  resources: transaltions,
  fallbackLng: "en",
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBarComponent></NavBarComponent>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
