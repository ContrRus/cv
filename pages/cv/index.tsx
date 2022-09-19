import Image from "next/image";
import { Knob } from "primereact/knob";
import StatusBarComponent from "../../components/status-bar/status-bar.component";
import styles from "./styles.module.css";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Head from "next/head";

// import { ReactComponent  as HatIcon } from "../../public/graduation-hat.svg";
import transaltions from "../../translations/translations.json";
// i18n.use(initReactI18next).init({
//   resources: transaltions,
//   fallbackLng: "en",
// });
const CvPage = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head> */}
      <div className="flex-row container lg:max-w-screen-lg h-screen bg-mainBlue    ">
        <header className="grid align-center justify-items-center grid-cols-1 sm:grid-cols-2 gap-4 pt-10">
          <div className="mb-3 bg-mainBlue">
            <h1 className="text-5xl text-center text-white  font-bold mb-2">
              Ruslan Shiyanov
            </h1>
            {/* <h2>{t('Welcome to React')}</h2>; */}
            <h2 className="text-3xl text-white mw-fit-content text-center font-bold">
              {t("Web Developer")}
            </h2>
            <picture className="object-scale-down justify-center flex mt-5">
              <source srcSet="/avv5.jpg" type="image/jpeg" />
              <img
                className={`${styles["avatar-img"]} rounded`}
                alt="Author image"
              />
            </picture>
          </div>
          <div className="bg-white text-base flex h-min my-auto items-center justify-center rounded  px-2 py-2 relative ">
            <p className="text-lg font-medium text-center">
              {t("CV_introtext1")}
              {t("CV_introtext2")}
              <a
                className="text-blue-500"
                href="https://dict-front.herokuapp.com/"
                target="blank"
              >
                <span className="ml-1 mr-1"> {t("CV_introtext3")}</span>
              </a>
              {t("CV_introtext4")}
              {t("CV_introtext5")}
            </p>
          </div>
        </header>
        <main className="grid justify-items-center grid-cols-1 sm:grid-cols-2 gap-4 bg-mainBlue">
          <div className=" bg-mainBlue p-2 py-10 overflow-hidden">
            {/* <h3 className="text-xl font-bold bg-white -ml-2 mr-10 pr-0 pl-5 py-2 border rounded mb-2">About me</h3> */}
            <h3 className="text-xl font-bold bg-white relative -left-5 pr-0 pl-5 py-2 border  rounded-r-full mb-2 text-mainBlue">
              {t("About_Me")}
            </h3>
            <div className="text-base text-white text-center">
              <p>{t("About_Me1")}</p>

              <p>{t("About_Me2")}</p>
            </div>
          </div>
          <div className="bg-white px-2 w-full flex flex-col  rounded h-min my-auto relative  ">
            <h3 className="py-2 px-2 text-xl bg-white text-mainBlue font-bold  ">
              {t("Contacts")}
            </h3>
            <div className=" mt-2 ">
              <ul className="flex-col flex justify-center items-center">
                <li className="mb-5 text-xl flex items-center hover:font-bold hover:text-mainBlue">
                  <Image
                    width={20}
                    height={20}
                    src="/email.svg"
                    alt="post"
                    className={`${styles["contact-icons"]} ${styles["svg-change-color"]}  `}
                  ></Image>
                  <a href="mailto:knightn1ofamber@gmail.com">
                    <p className="ml-2 text-lg  ">knightn1ofamber@gmail.com</p>
                  </a>
                </li>
                <li className="text-xl mb-4 flex items-center  hover:font-bold hover:text-mainBlue">
                  <Image
                    width={20}
                    height={20}
                    src="/telephone.svg"
                    alt="post"
                    className={`${styles["contact-icons"]} ${styles["svg-change-color"]} `}
                  ></Image>
                  <a href="tel:+7 705 389 11 51">
                    <p className="ml-2 text-lg ">+7 705 389 11 51</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className=" bg-mainBlue p-2 py-10 w-full overflow-hidden">
            {/* <h3 className="text-xl font-bold bg-white -ml-2 mr-10 pr-0 pl-5 py-2 border rounded mb-2">About me</h3> */}
            <h3 className="text-xl text-mainBlue font-bold bg-white relative -left-5 pr-0 pl-5 py-2 border  rounded-r-full mb-2 ">
              {t("Education")}
            </h3>
            <div className="text-base bg-mainBlue text-white">
              <ul>
                <li className="mb-2 ">
                  <h4 className="text-base flex items-center">
                    {/* <svg xmlns="../../public/graduation-hat.svg" fill="red"></svg> */}
                    <Image
                      src={"/graduation-hat.svg"}
                      width={50}
                      height={50}
                      alt="hat"
                      className={styles["svg-change-color"]}
                    ></Image>
                    ESIL University: 2020 - 2022
                  </h4>
                  <p className="text-2xl">{t("Information_Systems")} </p>
                </li>

                <li>
                  <h4 className="text-base flex items-center">
                    <Image
                      src={"/graduation-hat.svg"}
                      width={50}
                      height={50}
                      alt="hat"
                      className={styles["svg-change-color"]}
                      // style={{background:'white'}}
                    ></Image>
                    Lingua: 2013-2017
                  </h4>

                  <p className="text-2xl">{t("Foreign_Philology")}</p>
                </li>
              </ul>
              <div className=" mt-5">
                <h4 className="text-2xl flex items-center mb-2">
                  {t("Languages")}
                </h4>
                <div className="flex flex-col items-end">
                  <div className="flex items-center   mb-2">
                    <p className="text-base mr-2">{t("Russian")}</p>
                    <StatusBarComponent
                      percentage={100}
                      width={18.75}
                      height={0.625}
                      statusBarHeight={0.625}
                    />
                  </div>
                  <div className="flex items-center  mb-2">
                    <p className="text-base mr-2">{t("English")} </p>
                    <StatusBarComponent
                      percentage={80}
                      width={18.75}
                      height={0.625}
                      statusBarHeight={0.625}
                    />
                  </div>
                  <div className="flex items-center  mb-2">
                    <p className="text-base mr-2">{t("French")} </p>
                    <StatusBarComponent
                      percentage={60}
                      width={18.75}
                      height={0.625}
                      statusBarHeight={0.625}
                    />
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="text-base mr-2">{t("Spanish")} </p>
                    <StatusBarComponent
                      percentage={30}
                      width={18.75}
                      height={0.625}
                      statusBarHeight={0.625}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white px-2 rounded relative -right-2">
            <h3 className="py-2 px-2 text-xl bg-white text-mainBlue font-bold mb-2 ">
              {t("Skills")}
            </h3>
            <div className="flex-row flex justify-center flex-wrap gap-7">
              <div className="flex-row justify-center">
                <h3 className="text-base text-center">JS</h3>
                <Image
                  src="/java-script.svg"
                  width={100}
                  height={100}
                  alt="js"
                  className={`${styles["rotate-center"]}`}
                ></Image>
              </div>
              <div className="flex-row justify-center">
                <h3 className="text-base text-center">HTML</h3>
                <Image
                  src="/html.svg"
                  width={100}
                  height={100}
                  alt="HTML"
                  className={`${styles["rotate-center"]} `}
                ></Image>
              </div>
              <div className="flex-row justify-center">
                <h3 className="text-base text-center">CSS</h3>
                <Image
                  src="/css.svg"
                  width={100}
                  height={100}
                  alt="css"
                  className={`${styles["rotate-center"]}  `}
                ></Image>
              </div>
              <div className="flex-row justify-center">
                <h3 className="text-base text-center">React</h3>
                <Image
                  src="/react.svg"
                  width={100}
                  height={100}
                  alt="react"
                  className={`${styles["rotate-center"]} `}
                ></Image>
              </div>
              <div className="flex-row justify-center">
                <h3 className="text-base text-center">Angular</h3>
                <Image
                  src="/angular.svg"
                  width={100}
                  height={100}
                  alt="angular"
                  className={`${styles["rotate-center"]} `}
                ></Image>
              </div>
              <div className="flex-row justify-center">
                <h3 className="text-base text-center">NodeJS</h3>
                <Image
                  src="/nodejs.svg"
                  width={100}
                  height={100}
                  alt="nodejs"
                  className={`${styles["rotate-center"]} `}
                ></Image>
              </div>
              <div className="flex-row justify-center items-center">
                <h3 className="text-base text-center">MongoDB</h3>
                <Image
                  src="/mongo.svg"
                  width={100}
                  height={100}
                  alt="mongodb"
                  className={`${styles["rotate-center"]} `}
                ></Image>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CvPage;
