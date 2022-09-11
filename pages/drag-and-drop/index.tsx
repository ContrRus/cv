import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";
const DragAndDropPage = () => {
  const { t } = useTranslation();
  const backLogContentRef = useRef();
  const backLogListRef = useRef();
  const progressContentRef = useRef();
  const progressListRef = useRef();
  const completeContentRef = useRef();
  const completeListRef = useRef();
  const onHoldContentRef = useRef();
  const onHoldListRef = useRef();

  const [addBtns, setAddBtns] = useState();
  const [saveItemBtns, setSaveItemBtns] = useState();
  const [addItemContainers, setAddItemContainers] = useState();
  const [addItems, setAddItems] = useState();
  // let addBtns;
  // let saveItemBtns;
  // let addItemContainers;
  // let addItems;

  //   let listColumns;
  const [updatedOnLoad, setUpdatedOnLoad] = useState(false);
  const [listColumns, setListColumns] = useState();
  const [backlogListArray, setBacklogListArray] = useState([]);
  const [progressListArray, setProgressListArray] = useState([]);
  const [completeListArray, setCompleteListArray] = useState([]);
  const [onHoldListArray, setOnHoldListArray] = useState([]);
  const [listArrays, setListArrays] = useState([]);
  const [draggedItem, setDraggedItem] = useState();
  const [currentColumn, setCurrentColumn] = useState();
  const [previousColumn, setPreviousColumn] = useState();
  const [movingItemIndex, setMovingItemIndex] = useState(null);

  //   let backlogListArray = [];
  //   let progressListArray = [];
  //   let completeListArray = [];
  //   let onHoldListArray = [];
  //   let listArrays = [];

  const updateSavedColumns = useCallback(() => {
    let listArrays = [
      backlogListArray,
      progressListArray,
      completeListArray,
      onHoldListArray,
    ];
    // if(backlogListArray.length && progressListArray.le)
    const arrayNames = ["backlog", "progress", "complete", "onHold"];

    for (let i = 0; i < listArrays.length; i++) {
      localStorage.setItem(
        `${arrayNames[i]}Items`,
        JSON.stringify(listArrays[i])
      );
    }
  }, [backlogListArray, progressListArray, completeListArray, onHoldListArray]);

  const customDrag = (event, col = null, index = null) => {
    if (col !== null) {
      setPreviousColumn(col);
    }
    if (index !== null) {
      setMovingItemIndex(index);
    }
    try {
      event.preventDefault();
      // console.log("event", event);

      setDraggedItem((pV) => {
        return event.target;
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  // @ts-ignore: Unreachable code error
  if (typeof Array.prototype.move === "undefined") {
   // @ts-ignore: Unreachable code error
    Array.prototype.move = function (from, to, on = 1) {
      this.splice(to, 0, ...this.splice(from, on));
    };
  }
  // const moveElementInArray = (array, from, to) => {
  //   array.splice(to, ...array.splice(from));
  // };

  const drop = (e) => {
    e.preventDefault();
    const { value: onDropIndex } = e.target;

    if (listColumns) {
  // @ts-ignore: Unreachable code error

      listColumns.forEach((col) => {
        col.classList.remove(`${styles.over}`);
        col.classList.remove(`bg-dnd-1-col-color`);
        col.classList.remove(`bg-dnd-2-col-color`);
        col.classList.remove(`bg-dnd-3-col-color`);
        col.classList.remove(`bg-dnd-4-col-color`);
      });
      if (currentColumn !== null) {
        let [givingArray, setterGivingArray] = whatArray(previousColumn);
        let [gettingArray, setterGettingArray] = whatArray(currentColumn);
        if (previousColumn === currentColumn) {
          let copyArray = [...gettingArray];
          // console.log("copyArray bef", copyArray);
          copyArray.move(movingItemIndex, onDropIndex);
          setterGettingArray(copyArray);
          // moveElementInArray(copyArray, movingItemIndex, onDropIndex);
          // console.log("copyArray aft", copyArray);
        } else {
          setterGivingArray(
            givingArray.filter((el, index) => index != movingItemIndex)
          );
          setterGettingArray([...gettingArray, givingArray[movingItemIndex]]);
        }
      }
    }
  };

  const dragEnter = (col) => {
    let bgColor = `bg-dnd-${col + 1}-col-color`;
    setCurrentColumn(col);
    if (listColumns) {
      listColumns[col].classList.add(`${styles.over}`);
      listColumns[col].classList.add(`${bgColor}`);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const whatArray = (col) => {
    switch (col) {
      case 0:
        return [backlogListArray, setBacklogListArray];
      case 1:
        return [progressListArray, setProgressListArray];
      case 2:
        return [completeListArray, setCompleteListArray];
      case 3:
        return [onHoldListArray, setOnHoldListArray];
    }
  };

  function getSavedColumns() {
    if (localStorage.getItem("backlogItems")) {
      setBacklogListArray(JSON.parse(localStorage.backlogItems));
      setProgressListArray(JSON.parse(localStorage.progressItems));
      setCompleteListArray(JSON.parse(localStorage.completeItems));
      setOnHoldListArray(JSON.parse(localStorage.onHoldItems));
    } else {
      setBacklogListArray(["Release the course", "Sit back and relax"]);
      setProgressListArray(["Work on projects", "Listen to music"]);
      setCompleteListArray(["Being cool", "Getting stuff done"]);
      setOnHoldListArray(["Being uncool"]);
      //   backlogListArray = ["Release the course", "Sit back and relax"];
      //   progressListArray = ["Work on projects", "Listen to music"];
      //   completeListArray = ["Being cool", "Getting stuff done"];
      //   onHoldListArray = ["Being uncool"];
    }
  }

  const showInputBox = (col) => {
    addBtns[col].style.visibility = "hidden";
    saveItemBtns[col].style.display = "flex";
    addItemContainers[col].style.display = "flex";
  };

  const addToCol = (col) => {
    const [array, setArray] = whatArray(col);
    addItems[col].textContent = addItems[col].textContent.trim();
    if (addItems[col].textContent !== "") {
      setArray((pV) => [...pV, addItems[col].textContent]);
      setTimeout(() => {
        addItems[col].textContent = "";
      }, 500);
    }
  };

  const hideInputBox = (col) => {
    addBtns[col].style.visibility = "visible";
    saveItemBtns[col].style.display = "none";
    addItemContainers[col].style.display = "none";
    addToCol(col);
  };

  const updateItem = (index, col) => {
    const [array, setArray] = whatArray(col);
    const selectedColumnEl = listColumns[col].children;
    let moddifiedArray = [...array];
    for (let i = 0; i < moddifiedArray.length; i++) {
      if (i === index) {
        moddifiedArray[i] = selectedColumnEl[index].textContent;
        // console.log(moddifiedArray[i]);
      }
    }
    moddifiedArray = moddifiedArray.map((el) => el.trim());
    setArray(moddifiedArray.filter((el) => el));
    // console.log(selectedColumnEl[index].textContent);

    // setArray(pArray => pArray)
    // console.log("col", col);
  };

  useEffect(() => {
    if (!updatedOnLoad) {
      getSavedColumns();
    }
    setUpdatedOnLoad(true);
    setAddBtns(document.querySelectorAll(".add-btn:not(.solid)"));
    setSaveItemBtns(document.querySelectorAll(".solid"));
    setAddItemContainers(document.querySelectorAll(".add-container"));
    setAddItems(document.querySelectorAll(".add-item"));
    // addBtns = document.querySelectorAll(".add-btn:not(.solid)");
    // saveItemBtns = document.querySelectorAll(".solid");
    // addItemContainers = document.querySelectorAll(".add-container");
    // addItems = document.querySelectorAll(".add-item");
    let dragItemsList = document.querySelectorAll(".drag-item-list");
    setListColumns(dragItemsList);
  }, []);

  useEffect(() => {
    // if (needUpdateLocalStorage) {
    updateSavedColumns();
    // }
  }, [updateSavedColumns]);

  return (
    <div className="m-0 text-white overflow-y-hidden">
      <h1 className="text-center text-5xl text-mainBlue">
        {t("DragAndDropPage")}
      </h1>
      <div className="m-5">
        <ul className="md:flex items-start">
          <li className=" flex-1 my-2 mx-3 bg-black/40 rounded-xl overflow-x-hidden">
            <span className="">
              <h1 className=" tracking-wide flex justify-center rounded-lg m-3 text-2xl bg-dnd-1-col-color text-white drop-shadow-md py-2 ">
                {t("Backlog_")}
              </h1>
            </span>
            <div
              ref={backLogContentRef}
              className={` ${styles["custom-scroll"]}`}
            >
              <ul
                onDrop={drop}
                onDragOver={allowDrop}
                onDragEnter={() => dragEnter(0)}
                className="min-h-[50px] drag-item-list"
                ref={backLogListRef}
              >
                {backlogListArray.map((item, index) => {
                  return (
                    <li
                      contentEditable
                      draggable={true}
                      value={index}
                      onBlur={() => updateItem(index, 0)}
                      onDrag={() => customDrag(event, 0, index)}
                      key={Math.random() * 10000}
                      className="m-3 p-3 h-fit bg-black/80 rounded-xl leading-6 tracking-wide cursor-pointer focus:outline-none focus:bg-white focus:text-black transition-transform"
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex justify-between">
              <div
                onClick={() => showInputBox(0)}
                className="add-btn m-3 px-1 py-3 flex items-center cursor-pointer w-fit rounded transition-all duration-300 select-none hover:bg-white/90 hover:text-black active:scale-95"
              >
                <span className="text-2xl mr-1 relative -top-1">+</span>
                <span>{t("Add_Item")}</span>
              </div>
              <div
                onClick={() => hideInputBox(0)}
                className="add-btn solid m-3 px-1 py-3 hidden hover:brightness-95 hover:text-white hover:bg-dnd-1-col-color bg-dnd-1-col-color items-center cursor-pointer w-fit rounded transition-all duration-300 select-none"
              >
                <span>{t("Save_Item")} </span>
              </div>
            </div>
            <div className="add-container m-3 py-3 px-3 rounded-xl bg-white/90 min-h-[100px] hidden bg-dnd-1-col-color ">
              <div
                contentEditable
                className="add-item w-full min-h-[100px] h-auto bg-white rounded-xl mx-1 my-auto resize-none text-black p-3 focus:outline-none"
              ></div>
            </div>
          </li>

          <li className=" flex-1 my-2 mx-3 bg-black/40 rounded-xl overflow-x-hidden">
            <span className="">
              <h1 className=" tracking-wide flex justify-center rounded-lg m-3 text-2xl bg-dnd-2-col-color text-white drop-shadow-md py-2 ">
                {t("Progress_")}
              </h1>
            </span>
            <div
              ref={progressContentRef}
              className={` ${styles["custom-scroll"]}`}
            >
              <ul
                onDrop={drop}
                onDragOver={allowDrop}
                onDragEnter={() => dragEnter(1)}
                className="min-h-[50px] drag-item-list"
                ref={progressListRef}
              >
                {progressListArray.map((item, index) => {
                  return (
                    <li
                      onDrag={() => customDrag(event, 1, index)}
                      draggable={true}
                      onBlur={() => updateItem(index, 1)}
                      value={index}
                      contentEditable
                      key={Math.random() * 10000}
                      className="m-3 p-3 h-fit bg-black/80 rounded-xl leading-6 tracking-wide cursor-pointer focus:outline-none focus:bg-white focus:text-black"
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex justify-between">
              <div
                onClick={() => showInputBox(1)}
                className="add-btn m-3 px-1 py-3 flex items-center cursor-pointer w-fit rounded transition-all duration-300 select-none hover:bg-white/90 hover:text-black active:scale-95"
              >
                <span className="text-2xl mr-1 relative -top-1">+</span>
                <span>{t("Add_Item")}</span>
              </div>
              <div
                onClick={() => hideInputBox(1)}
                className="add-btn solid m-3 px-1 py-3 hidden hover:brightness-95 hover:text-white hover:bg-dnd-2-col-color bg-dnd-2-col-color items-center cursor-pointer w-fit rounded transition-all duration-300 select-none"
              >
                <span>{t("Save_Item")} </span>
              </div>
            </div>
            <div className="add-container m-3 py-3 px-3 rounded-xl bg-white/90 min-h-[100px] hidden bg-dnd-2-col-color ">
              <div
                contentEditable
                className="add-item w-full min-h-[100px] h-auto bg-white rounded-xl mx-1 my-auto resize-none text-black p-3 focus:outline-none"
              ></div>
            </div>
          </li>

          <li className=" flex-1 my-2 mx-3 bg-black/40 rounded-xl overflow-x-hidden">
            <span className="">
              <h1 className=" tracking-wide flex justify-center rounded-lg m-3 text-2xl bg-dnd-3-col-color text-white drop-shadow-md py-2 ">
                {t("Complete_")}
              </h1>
            </span>
            <div
              ref={completeContentRef}
              className={` ${styles["custom-scroll"]}`}
            >
              <ul
                onDrop={drop}
                onDragOver={allowDrop}
                onDragEnter={() => dragEnter(2)}
                className="min-h-[50px] drag-item-list"
                ref={completeListRef}
              >
                {completeListArray.map((item, index) => {
                  return (
                    <li
                      onDrag={() => customDrag(event, 2, index)}
                      onBlur={() => updateItem(index, 2)}
                      value={index}
                      draggable={true}
                      contentEditable
                      key={Math.random() * 10000}
                      className="m-3 p-3 h-fit bg-black/80 rounded-xl leading-6 tracking-wide cursor-pointer focus:outline-none focus:bg-white focus:text-black"
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex justify-between">
              <div
                onClick={() => showInputBox(2)}
                className="add-btn m-3 px-1 py-3 flex items-center cursor-pointer w-fit rounded transition-all duration-300 select-none hover:bg-white/90 hover:text-black active:scale-95"
              >
                <span className="text-2xl mr-1 relative -top-1">+</span>
                <span>{t("Add_Item")}</span>
              </div>
              <div
                onClick={() => hideInputBox(2)}
                className="add-btn solid m-3 px-1 py-3 hidden hover:brightness-95 hover:text-white hover:bg-dnd-3-col-color bg-dnd-3-col-color items-center cursor-pointer w-fit rounded transition-all duration-300 select-none"
              >
                <span>{t("Save_Item")} </span>
              </div>
            </div>
            <div className="add-container m-3 py-3 px-3 rounded-xl bg-white/90 min-h-[100px] hidden bg-dnd-3-col-color ">
              <div
                contentEditable
                className="add-item w-full min-h-[100px] h-auto bg-white rounded-xl mx-1 my-auto resize-none text-black p-3 focus:outline-none"
              ></div>
            </div>
          </li>

          <li className=" flex-1 my-2 mx-3 bg-black/40 rounded-xl overflow-x-hidden">
            <span className="">
              <h1 className=" tracking-wide flex justify-center rounded-lg m-3 text-2xl bg-dnd-4-col-color text-white drop-shadow-md py-2 ">
                {t("On_Hold")}
              </h1>
            </span>
            <div
              ref={onHoldContentRef}
              className={` ${styles["custom-scroll"]}`}
            >
              <ul
                onDrop={drop}
                onDragOver={allowDrop}
                onDragEnter={() => dragEnter(3)}
                className="min-h-[50px] drag-item-list"
                ref={onHoldListRef}
              >
                {onHoldListArray.map((item, index) => {
                  return (
                    <li
                      onDrag={() => customDrag(event, 3, index)}
                      onBlur={() => updateItem(index, 3)}
                      value={index}
                      draggable={true}
                      contentEditable
                      key={Math.random() * 10000}
                      className="m-3 p-3 h-fit bg-black/80 rounded-xl leading-6 tracking-wide cursor-pointer focus:outline-none focus:bg-white focus:text-black"
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex justify-between">
              <div
                onClick={() => showInputBox(3)}
                className="add-btn m-3 px-1 py-3 flex items-center cursor-pointer w-fit rounded transition-all duration-300 select-none hover:bg-white/90 hover:text-black active:scale-95"
              >
                <span className="text-2xl mr-1 relative -top-1">+</span>
                <span>{t("Add_Item")}</span>
              </div>
              <div
                onClick={() => hideInputBox(3)}
                className="add-btn solid m-3 px-1 py-3 hidden hover:brightness-95 hover:text-white hover:bg-dnd-4-col-color bg-dnd-4-col-color items-center cursor-pointer w-fit rounded transition-all duration-300 select-none"
              >
                <span>{t("Save_Item")} </span>
              </div>
            </div>
            <div className="add-container m-3 py-3 px-3 rounded-xl bg-white/90 min-h-[100px] hidden bg-dnd-4-col-color">
              <div
                contentEditable
                className="add-item w-full min-h-[100px] h-auto bg-white rounded-xl mx-1 my-auto resize-none text-black p-3 focus:outline-none"
              ></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DragAndDropPage;
