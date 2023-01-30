import React, { useCallback, useEffect, useState } from "react";

import { DropdownListProp } from "./type";
import style from "./dropdownlist.module.css";
import { Arrow } from "@components/algorithms";

export const DropdownList: React.FC<DropdownListProp> = ({
  title,
  value,
  items,
  disabled,
  isMobile,
  optionHandler,
}) => {
  const [isShown, setShown] = useState(false);

  const onClickSelectButton = useCallback(() => {
    setShown(!isShown);
  }, [isShown]);

  const onClickOption = useCallback(
    (value: any) => {
      optionHandler(value);
      setShown(true);
    },
    [optionHandler]
  );

  useEffect(() => {
    window.addEventListener("click", function (e: any) {
      const isInsideClick = document.getElementById(title)?.contains(e.target);
      if (!isInsideClick) {
        setShown(false);
      }
    });
  }, []);

  return isMobile ? (
    <select
      className={style.select}
      value={value}
      onChange={(e) => !disabled && onClickOption(e.target.value)}
      style={{
        margin: "8px 8px 8px 0px",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      disabled={disabled}
    >
      {items.map((item) => {
        return (
          <option key={item.name} value={item.value}>
            {item.name}
          </option>
        );
      })}
    </select>
  ) : (
    <div>
      <div
        id={title}
        className={style.selectButton}
        onClick={disabled ? () => {} : onClickSelectButton}
        style={{
          margin: "0px 8px 8px 0px",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <span>{title}:</span>
        <span className={style.selectButtonText}>{value}</span>
        <div style={{ marginLeft: 4 }}>
          <Arrow size={3} direction={isShown ? "up" : "down"} thickness={2} />
        </div>
      </div>

      <div
        style={{
          opacity: isShown ? 100 : 0,
          visibility: isShown ? "visible" : "hidden",
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
                <span style={{ fontWeight: value === item.value ? 700 : 400 }}>
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
