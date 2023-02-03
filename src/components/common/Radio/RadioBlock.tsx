import { Radio, Size } from "./Radio";

type RadioBlockProp = {
  items: any[];
  value: any;
  onChange?: (value: any) => void;
  fontColor?: string;
  circleColor?: string;
  size?: Size;
};

export const RadioBlock: React.FC<RadioBlockProp> = ({
  items,
  value,
  onChange,
  fontColor,
  circleColor,
  size,
}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {items.map((item) => {
        return (
          <div
            key={item}
            style={{
              margin: "0px 8px 10px 0px",
              borderRadius: 20,
            }}
            onClick={() => onChange && onChange(item)}
          >
            <Radio
              content={item}
              checked={item === value}
              fontColor={fontColor}
              circleColor={circleColor}
              size={size}
            />
          </div>
        );
      })}
    </div>
  );
};
