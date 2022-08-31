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
    <nav className="container ">
      <ul className="flex justify-start py-2 hidden sm:flex">
        <li className="ml-2">
          <Link href="/cv">
            <button className="border px-2"> CV</button>
          </Link>
        </li>
        <li className="ml-2">
          <Link href="/snake-game">
            <button className="border px-2">Snake Game</button>
          </Link>
        </li>
        <li className="ml-2">
          <Link href="/chat">
            <button className="border px-2"> Simple chat</button>
          </Link>
        </li>
      </ul>
      <div className="sm:hidden">
        <div
          className="space-y-2 cursor-pointer py-2 px-2"
          onClick={() => {
            // if (!showBurgerMenu) {
            //   document.body.style.overflow = "hidden";
            // } else {
            //   document.body.style.overflow = "auto";
            // }
            checkOverFlow();
            setShowBurgerMenu(!showBurgerMenu);
          }}
        >
          <span className="block w-8 h-1 bg-gray-600"></span>
          <span className="block w-8 h-1 bg-gray-600"></span>
          <span className="block w-8 h-1 bg-gray-600"></span>
        </div>
        {
          <div
            ref={burgerMenuRef}
            className={`absolute  h-screen w-screen z-10 bg-mainBlue ${
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
                    onClick={() => setShowBurgerMenu(false)}
                  >
                    Snake Game
                  </button>
                </Link>
              </li>
              <li className="ml-2">
                <Link href="/chat">
                  <button
                    className="border px-2 text-white text-5xl "
                    onClick={() => setShowBurgerMenu(false)}
                  >
                    {" "}
                    Simple chat
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
