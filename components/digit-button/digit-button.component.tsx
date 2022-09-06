import { ACTIONS } from "../../pages/calculator";
const DigitButtonComponent = ({ dispatch, digit }) => {
  return (
    <button
      className="text-3xl border outline-none border-white/75 hover:bg-white/50 focus:bg-white/50"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: {digit} })}
    >
      {digit}
    </button>
  );
};

export default DigitButtonComponent;
