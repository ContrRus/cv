import { ACTIONS } from "../../pages/calculator";
const OperationButtonComponent = ({ dispatch, operation }) => {
  return (
    <button
      className="text-3xl border outline-none border-white/75 hover:bg-white/50 focus:bg-white/50"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
};

export default OperationButtonComponent;
