import React, { useCallback, useState } from "react";

import { DropdownListProp } from "./type";
import style from "./dropdownlist.module.css";

export const DropdownList: React.FC<DropdownListProp> = ({
  title,
  value,
  items,
  optionHandler,
}) => {
  const [toggled, setToggled] = useState(true);

  const onClickSelectButton = useCallback(() => {
    setToggled(!toggled);
  }, [toggled]);

  const onClickOption = useCallback(
    (value: any) => {
      optionHandler(value);
      setToggled(!toggled);
    },
    [optionHandler, toggled]
  );

  return (
    <div>
      <div
        className={style.selectButton}
        onClick={onClickSelectButton}
        style={{ margin: "8px 0 8px 8px" }}
      >
        <span>{title}</span>
        <span className={style.selectButtonText}>{value}</span>
      </div>

      <div
        style={{
          opacity: toggled ? 0 : 100,
          visibility: toggled ? "hidden" : "visible",
          transition: "all 0.2s ease-in-out",
        }}
      >
        <ul className={style.optionList}>
          {items.map((item) => {
            return (
              <li
                key={item.name}
                className={style.option}
                onClick={() => onClickOption(item.value)}
              >
                <span className={style["option-text"]}>{item.value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
