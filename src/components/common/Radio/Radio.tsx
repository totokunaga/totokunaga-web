import style from "./radio.module.scss";
import neumorphicStyle from "@styles/neumorphic.module.scss";

type RadioProp = {
  items: any[];
  value: any;
  onChange: (value: any) => void;
};

export const Radio: React.FC<RadioProp> = ({ items, value, onChange }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {items.map((item) => {
        const checkedClass = item === value && style.checked;

        return (
          <div
            key={item}
            style={{
              margin: "0px 8px 10px 0px",
              borderRadius: 20,
            }}
            onClick={() => onChange(item)}
          >
            <div
              className={`${neumorphicStyle.root} ${neumorphicStyle.radio} ${checkedClass}`}
            >
              <div className={`${style.radio_circle} ${checkedClass}`} />
              <span>{item}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
