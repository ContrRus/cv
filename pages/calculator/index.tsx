import { useReducer } from "react";
import DigitButtonComponent from "../../components/digit-button/digit-button.component";
import OperationButtonComponent from "../../components/operation-button/operation-button.component";

interface State {
  currentOperand: string;
  previousOperand: string;
  opertaion: string;
}

export const ACTIONS = {
  ADD_DIGIT: "ADD_DIGIT",
  CHOOSE_OPERATION: "CHOOSE_OPERATION",
  CLEAR: "CLEAR",
  DELETE_DIGIT: "DELETE_DIGIT",
  EVALUATE: "EVALUATE",
};

const reducer = (state, { type, payload = null }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === 0 && state.currentOperand === "0") return state;
      if (payload.digit === "." && state?.currentOperand?.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null)
        return state;

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null,
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.previousOperand == null ||
        state.currentOperand == null
      )
        return state;

      return {
        ...state,
        operation: null,
        overwrite: true,
        previousOperand: null,
        currentOperand: evaluate(state),
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      return {
        ...state,
        currentOperand: state.currentOperand?.slice(0, -1),
      };

    default:
      return state;
  }
};

const evaluate = ({ previousOperand, currentOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = null;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "÷":
      computation = prev / current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "%":
      computation = prev % current;
      break;
  }
  return computation.toString();
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const formatOperand = (operand) => {
  if (operand == null) return;
  if (typeof operand === "number") {
    operand = new String(operand);
  }

  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
};

const CalculatorPage = () => {
  let initialState: State = {
    currentOperand: "",
    previousOperand: "",
    opertaion: "",
  };
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 container lg:max-w-screen-sm md:max-w-screen-sm">
      <div className="grid grid-cols-4 justify-center grid-rows-custom-min-7-max-auto gap4 mt-8 text-lg">
        <div className="col-span-full bg-black/75 flex flex-col items-end justify-around p-3 break-all break-words ">
          <div className="text-white/75 text-2xl">
            {previousOperand && formatOperand(previousOperand)} {operation}
          </div>
          <div className="text-white text-4xl">
            {formatOperand(currentOperand)}
          </div>
        </div>
        <button
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          className="col-span-2 text-3xl border outline-none border-white/75 hover:bg-white/50 focus:bg-white/50"
        >
          AC
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          className=" text-3xl border outline-none border-white/75 hover:bg-white/50 focus:bg-white/50"
        >
          DEL
        </button>

        {/* <DigitButtonComponent digit={"DEL"} dispatch={dispatch} /> */}
        <OperationButtonComponent operation={"÷"} dispatch={dispatch} />
        <DigitButtonComponent digit={1} dispatch={dispatch} />
        <DigitButtonComponent digit={2} dispatch={dispatch} />
        <DigitButtonComponent digit={3} dispatch={dispatch} />
        <OperationButtonComponent operation={"*"} dispatch={dispatch} />
        <DigitButtonComponent digit={4} dispatch={dispatch} />
        <DigitButtonComponent digit={5} dispatch={dispatch} />
        <DigitButtonComponent digit={6} dispatch={dispatch} />
        <OperationButtonComponent operation={"+"} dispatch={dispatch} />
        <DigitButtonComponent digit={7} dispatch={dispatch} />
        <DigitButtonComponent digit={8} dispatch={dispatch} />
        <DigitButtonComponent digit={9} dispatch={dispatch} />
        <OperationButtonComponent operation={"-"} dispatch={dispatch} />
        <DigitButtonComponent digit={"."} dispatch={dispatch} />
        <DigitButtonComponent digit={0} dispatch={dispatch} />
        <OperationButtonComponent operation={"%"} dispatch={dispatch} />

        <button
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          className="col-span-1 text-3xl border outline-none border-white/75 hover:bg-white/50 focus:bg-white/50"
        >
          =
        </button>
        {/* <DigitButtonComponent className="col-span-2 text-3xl border outline-none border-white/75 hover:bg-white/50 focus:bg-white/50">
          =
        </DigitButtonComponent> */}
      </div>
    </div>
  );
};

export default CalculatorPage;
