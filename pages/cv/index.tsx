import Image from "next/image";
import { Knob } from "primereact/knob";
import StatusBarComponent from "../../components/status-bar/status-bar.component";
import styles from "./styles.module.css";
// import { ReactComponent  as HatIcon } from "../../public/graduation-hat.svg";

const CvPage = () => {
  return (
    <div className="flex-row container lg:max-w-screen-md max-w-lg h-screen bg-mainBlue    ">
      <header className="grid align-center justify-items-center grid-cols-1 sm:grid-cols-2 gap-4 pt-10">
        <div className="mb-3 bg-mainBlue">
          <h1 className="text-5xl text-center text-white  font-bold mb-2">
            Ruslan Shiyanov
          </h1>
          <h2 className="text-3xl text-white mw-fit-content text-center font-bold">
            Web Developer
          </h2>
          <picture className="object-scale-down justify-center flex mt-5">
            <source srcSet="/avatar.jpeg" type="image/jpeg" />
            <img
              className={`${styles["avatar-img"]} rounded-full`}
              alt="Author image"
            />
          </picture>
        </div>
        <div className="bg-white text-base flex h-min my-auto items-center justify-center rounded px-2 py-2 relative -right-2">
          <p className="text-lg">
            Hi there! This page is simple CV-like project that was written in
            NextJS. Feel free to check out my other projects using navigation.
            Also check out
            <a
              className="text-blue-500"
              href="https://dict-front.herokuapp.com/"
              target="blank"
            >
              <span className="ml-1 mr-1">my dictionary app</span>
            </a>
            that was written in Angular 12 + LoopBack 4. Do not worry if loading
            takes too long it is because app is being hosted on heroku and it
            needs some time to start up.
          </p>
        </div>
      </header>
      <main className="grid justify-items-center grid-cols-1 sm:grid-cols-2 gap-4 bg-mainBlue">
        <div className=" bg-mainBlue p-2 py-10 overflow-hidden">
          {/* <h3 className="text-xl font-bold bg-white -ml-2 mr-10 pr-0 pl-5 py-2 border rounded mb-2">About me</h3> */}
          <h3 className="text-xl font-bold bg-white relative -left-5 pr-0 pl-5 py-2 border  rounded-r-full mb-2 text-mainBlue">
            About me
          </h3>
          <p className="text-base text-white">
            Super eager to embrace new challenges and opportunities in web
            development, have ongoing self-studying, and crave for getting more
            practical experience! I’m currently employed at LLP Devir as a Web
            Developer. While working there I’m creating and developing websites
            for clients, and making their pages attractive and functional. In
            addition to excellent programming and creativity, I rely on
            extensive knowledge of HTML, CSS, JavaScript, Angular, Node JS, and
            MongoDB. Through my experience coding and creating/amending sites, I
            have amassed my professional and motivational skills.
          </p>
        </div>
        <div className="bg-white px-2 w-full flex flex-col  rounded h-min my-auto relative -right-2 ">
          <h3 className="py-2 px-2 text-xl bg-white text-mainBlue font-bold  ">
            Contacts
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
            Education
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
                <p className="text-2xl">Information Systems</p>
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

                <p className="text-2xl">Foreign Philology</p>
              </li>
            </ul>
            <div className=" mt-5">
              <h4 className="text-2xl flex items-center mb-2">Languages</h4>
              <div className="flex flex-col items-end">
                <div className="flex items-center   mb-2">
                  <p className="text-base mr-2">Russian</p>
                  <StatusBarComponent
                    percentage={100}
                    width={18.75}
                    height={0.625}
                    statusBarHeight={0.625}
                  />
                </div>
                <div className="flex items-center  mb-2">
                  <p className="text-base mr-2">English</p>
                  <StatusBarComponent
                    percentage={80}
                    width={18.75}
                    height={0.625}
                    statusBarHeight={0.625}
                  />
                </div>
                <div className="flex items-center  mb-2">
                  <p className="text-base mr-2">French</p>
                  <StatusBarComponent
                    percentage={60}
                    width={18.75}
                    height={0.625}
                    statusBarHeight={0.625}
                  />
                </div>
                <div className="flex items-center mb-2">
                  <p className="text-base mr-2">Spanish</p>
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
            Skills
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
  );
};

export default CvPage;
