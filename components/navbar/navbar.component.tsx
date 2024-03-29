import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";
export const NavBarComponent = () => {
  const router = useRouter();
  const { locale, locales } = router;
  const { t } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState("en");
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const burgerMenuRef = useRef();
  const checkOverFlow = () => {
    if (!showBurgerMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleWindowSizeChange = (e) => {
    // @ts-ignore
    setWidth(window.innerWidth);
    // @ts-ignore
    setHeight(window.innerHeight);
    console.log("e", window.innerWidth);
  };

  const { i18n } = useTranslation();
  const changeLocaleLanguage = (locale) => {
    setActiveLanguage(locale);
    i18n.changeLanguage(locale);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    console.log("window", window);
    // @ts-ignore

    setWidth(window.innerWidth);
    // @ts-ignore
    setHeight(window.innerHeight);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  // @ts-ignore

  const isMobile = width <= 768;
  return (
    <>
      <nav className="container lg:max-w-screen-lg sticky inset-x-0 top-0 mx-auto z-10">
        <div className="flex justify-center ">
          <ul className=" justify-center items-center py-2 hidden sm:flex">
            <li className="ml-2">
              <Link href="/cv">
                <button className="border px-2 text-2xl bg-mainBlue text-white hover:text-mainBlue hover:bg-white">
                  {t("CV")}
                </button>
              </Link>
            </li>
            <li className="ml-2">
              <Link href="/snake-game">
                <button className="border px-2  text-2xl bg-mainBlue text-white hover:text-mainBlue hover:bg-white">
                  {t("Snake_Game")}
                </button>
              </Link>
            </li>
            {/* <li className="ml-2">
              <Link href="/chat">
                <button className="border px-2  text-2xl bg-mainBlue text-white hover:text-mainBlue hover:bg-white">
                  {t("Simple_Chat")}
                </button>
              </Link>
            </li> */}
            <li className="ml-2">
              <Link href="/infinite-scroll">
                <button className="border px-2  text-2xl bg-mainBlue text-white hover:text-mainBlue hover:bg-white">
                  {t("Infinite_Scroll")}
                </button>
              </Link>
            </li>
            <li className="ml-2">
              <Link href="/calculator">
                <button className="border px-2  text-2xl bg-mainBlue text-white hover:text-mainBlue hover:bg-white">
                  {t("Calculator")}
                </button>
              </Link>
            </li>
            {!isMobile && (
              <li className="ml-2">
                <Link href="/drag-and-drop">
                  <button className="border px-2  text-2xl bg-mainBlue text-white hover:text-mainBlue hover:bg-white">
                    {t("DragAndDropPage")}
                  </button>
                </Link>
              </li>
            )}
          </ul>
          <div className=" ml-2  items-center hidden sm:flex">
            <p
              className="mr-2 cursor-pointer px-1"
              style={{
                border: `${activeLanguage === "en" ? "2px solid black" : ""}`,
              }}
            >
              <Image
                src={"/us.png"}
                width={30}
                height={30}
                alt={"US Flage"}
                className={`${locale === "en"}`}
                onClick={() => changeLocaleLanguage("en")}
              ></Image>
            </p>
            <p
              className="cursor-pointer px-1"
              style={{
                border: `${activeLanguage === "fr" ? "2px solid black" : ""}`,
              }}
            >
              <Image
                src={"/france.png"}
                width={30}
                height={30}
                alt={"FR Flage"}
                onClick={() => changeLocaleLanguage("fr")}
              ></Image>
            </p>
          </div>
        </div>
      </nav>
      <div className="sm:hidden  ">
        <div
          className={`space-y-2 z-20 w-min relative cursor-pointer py-2 px-2 `}
          onClick={() => {
            checkOverFlow();
            setShowBurgerMenu(!showBurgerMenu);
          }}
        >
          <span
            className={`block w-8 h-1  ${
              showBurgerMenu ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
          <span
            className={`block w-8 h-1  ${
              showBurgerMenu ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
          <span
            className={`block w-8 h-1  ${
              showBurgerMenu ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        </div>
        <div className=" ml-2  items-center flex ">
          <p
            className="mr-2 cursor-pointer px-1 mb-1"
            style={{
              border: `${activeLanguage === "en" ? "2px solid black" : ""}`,
            }}
          >
            <Image
              src={"/us.png"}
              width={30}
              height={30}
              alt={"US Flage"}
              onClick={() => changeLocaleLanguage("en")}
            ></Image>
          </p>
          <p
            className="cursor-pointer px-1 mb-1"
            style={{
              border: `${activeLanguage === "fr" ? "2px solid black" : ""}`,
            }}
          >
            <Image
              src={"/france.png"}
              width={30}
              height={30}
              alt={"FR Flage"}
              onClick={() => changeLocaleLanguage("fr")}
            ></Image>
          </p>
        </div>
        {
          <div
            ref={burgerMenuRef}
            style={{ width, height }}
            className={`absolute top-0 h-[${height}] w-[${width}] z-10 bg-mainBlue ${
              showBurgerMenu
                ? styles["scale-in-hor-left"]
                : styles["scale-out-hor-left"]
            }  `}
          >
            <ul className="flex flex-col justify-evenly h-full">
              <li className="ml-2">
                <Link href="/cv">
                  <button
                    className="border px-2 text-white text-5xl "
                    onClick={() => {
                      checkOverFlow();
                      setShowBurgerMenu(false);
                    }}
                  >
                    {t("CV")}
                  </button>
                </Link>
              </li>
              <li className="ml-2">
                <Link href="/snake-game">
                  <button
                    className="border px-2 text-white text-5xl "
                    onClick={() => {
                      checkOverFlow();
                      setShowBurgerMenu(false);
                    }}
                  >
                    {t("Snake_Game")}
                  </button>
                </Link>
              </li>
              {/* <li className="ml-2">
                <Link href="/chat">
                  <button
                    className="border px-2 text-white text-5xl "
                    onClick={() => {
                      checkOverFlow();
                      setShowBurgerMenu(false);
                    }}
                  >
                    {t("Simple_Chat")}
                  </button>
                </Link>
              </li> */}
              <li className="ml-2">
                <Link href="/infinite-scroll">
                  <button
                    className="border px-2 text-white text-5xl "
                    onClick={() => {
                      checkOverFlow();
                      setShowBurgerMenu(false);
                    }}
                  >
                    {t("Infinite_Scroll")}
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/calculator">
                  <button
                    className="border px-2 text-white text-5xl "
                    onClick={() => {
                      checkOverFlow();
                      setShowBurgerMenu(false);
                    }}
                  >
                    {t("Calculator")}
                  </button>
                </Link>
              </li>
              {!isMobile && (
                <li>
                  <Link href="/drag-and-drop">
                    <button
                      className="border px-2 text-white text-5xl "
                      onClick={() => {
                        checkOverFlow();
                        setShowBurgerMenu(false);
                      }}
                    >
                      {t("DragAndDropPage")}
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        }
      </div>
    </>
  );
};

export default NavBarComponent;
