const StatusBarComponent = ({ percentage, width, height, statusBarHeight }) => {
  return (
    <div
      style={{ width: `${width}rem`, height: `${height}rem` }}
      className="rounded-2xl border "
    >
      <div
        style={{
          width: `${percentage}%`,
          height: `${statusBarHeight}rem`,
          backgroundColor: "white",
        }}
        className="rounded-2xl border relative "
      ></div>
    </div>
  );
};

export default StatusBarComponent;
