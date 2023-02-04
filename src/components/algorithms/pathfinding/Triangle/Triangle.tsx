import style from "./triangle.module.scss";

const Triangle: React.FC = () => {
  return (
    <div style={{ transform: "rotate(-30deg)" }}>
      <div className={style.triangle}></div>
    </div>
  );
};

export default Triangle;
