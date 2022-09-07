import Link from "next/link";
import React, { useRef, useState } from "react";
import styles from "./styles.module.css";

export const NavBarComponent = () => {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const burgerMenuRef = useRef();
  const checkOverFlow = () => {
    if (!showBurgerMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  return (
    <nav className="container lg:max-w-screen-lg sticky inset-x-0 top-0 mx-auto z-10">
      <ul className=" justify-center py-2 hidden sm:flex">
        <li className="ml-2">
          <Link href="/cv">
            <button className="border px-2 text-2xl bg-mainBlue text-white hover:text-mainBlue hover:bg-white">
              CV
            </button>
          </Link>
        </li>
        <li className="ml-2">
          <Link href="/snake-game">
            <button className="border px-2  text-2xl bg-mainBlue text-white hover:text-mainBlue hover:bg-white">
              Snake Game
            </button>
          </Link>
        </li>
        <li className="ml-2">
          <Link href="/chat">
            <button className="border px-2  text-2xl bg-mainBlue text-white hover:text-mainBlue hover:bg-white">
              Simple chat
            </button>
          </Link>
        </li>
        <li className="ml-2">
          <Link href="/infinite-scroll">
            <button className="border px-2  text-2xl bg-mainBlue text-white hover:text-mainBlue hover:bg-white">
              Infinite scroll
            </button>
          </Link>
        </li>
        <li className="ml-2">
          <Link href="/calculator">
            <button className="border px-2  text-2xl bg-mainBlue text-white hover:text-mainBlue hover:bg-white">
              Calculator
            </button>
          </Link>
        </li>
      </ul>
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
            } ${styles["animate-burger-menu"]} ` }
          ></span>
          <span
            className={`block w-8 h-1  ${
              showBurgerMenu ? "bg-white" : "bg-gray-400"
            } ${styles["animate-burger-menu"]}`}
          ></span>
          <span
            className={`block w-8 h-1  ${
              showBurgerMenu ? "bg-white" : "bg-gray-400"
            } ${styles["animate-burger-menu"]}`}
          ></span>
        </div>
        {
          <div
            ref={burgerMenuRef}
            className={`absolute top-0 h-screen w-screen z-10 bg-mainBlue ${
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
                    CV
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
                    Snake Game
                  </button>
                </Link>
              </li>
              <li className="ml-2">
                <Link href="/chat">
                  <button
                    className="border px-2 text-white text-5xl "
                    onClick={() => {
                      checkOverFlow();
                      setShowBurgerMenu(false);
                    }}
                  >
                    Simple chat
                  </button>
                </Link>
              </li>
              <li className="ml-2">
                <Link href="/infinite-scroll">
                  <button
                    className="border px-2 text-white text-5xl "
                    onClick={() => {
                      checkOverFlow();
                      setShowBurgerMenu(false);
                    }}
                  >
                    Infinite scroll
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
                    Calculator
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        }
      </div>
    </nav>
  );
};

export default NavBarComponent;
