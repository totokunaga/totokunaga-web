import { isTouchDevice } from "@utils/functions";
import { useEffect } from "react";
import style from "./slider.module.scss";

type SliderProp = {
  initValue: number;
  onChange: (value: number) => void;
  getUpdateValue: (value: number) => number;
  getDisplayValue: (value: number) => string;
};

export const Slider: React.FC<SliderProp> = ({
  initValue,
  onChange,
  getUpdateValue,
  getDisplayValue,
}) => {
  useEffect(() => {
    const target: any = document.getElementById("slider-target");
    const btn: any = document.getElementById("slider-btn");
    const color: any = document.getElementById("slider-color");
    const tooltip: any = document.getElementById("slider-tooltip");

    const touchDevice = isTouchDevice();
    const event = {
      start: touchDevice ? "touchstart" : "mousedown",
      move: touchDevice ? "touchmove" : "mousemove",
      end: touchDevice ? "touchend" : "mouseup",
    };

    if (target && btn && color && tooltip) {
      const onMouseMove = (e: any) => {
        e.preventDefault();
        const targetRect = target.getBoundingClientRect();
        let x = e.pageX - targetRect.left + 10;
        if (x > targetRect.width) {
          x = targetRect.width;
        }
        if (x < 0) {
          x = 0;
        }
        btn.x = x - 10;
        btn.style.left = btn.x + "px";

        // get the position of the button inside the container (%)
        const percentPosition = ((btn.x + 10) / targetRect.width) * 100;
        const calculated = getUpdateValue(percentPosition);
        onChange(calculated);

        // color width = position of button (%)
        color.style.width = percentPosition + "%";

        // move the tooltip when button moves, and show the tooltip
        tooltip.style.left = btn.x - 5 + "px";
        tooltip.style.opacity = 1;

        // show the percentage in the tooltip
        tooltip.textContent = getDisplayValue(calculated);
      };

      const onMouseUp = (e: any) => {
        window.removeEventListener(event.move, onMouseMove);
        tooltip.style.opacity = 0;

        btn.addEventListener(event.start, function () {
          tooltip.style.opacity = 1;
        });

        btn.addEventListener(event.end, function () {
          tooltip.style.opacity = 0;
        });
      };

      target.addEventListener(event.start, (e: any) => {
        onMouseMove(e);
        window.addEventListener(event.move, onMouseMove);
        window.addEventListener(event.end, onMouseUp);
      });
    }
  }, []);

  return (
    <div id={"slider-target"} className={style.slider} onMouseMove={(e) => {}}>
      <div className={`${style.slider} ${style.box}`}>
        <span
          id={"slider-btn"}
          className={`${style.slider} ${style.btn}`}
        ></span>
        <span
          id={"slider-color"}
          className={`${style.slider} ${style.color}`}
        ></span>
        <span
          id={"slider-tooltip"}
          className={`${style.slider} ${style.tooltip}`}
        >
          {getDisplayValue(initValue)}
        </span>
      </div>
    </div>
  );
};
