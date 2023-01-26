import React from "react";
import styles from "@styles/algorithm.module.css";

export const Triangle: React.FC<{ size?: number }> = ({ size = 30 }) => {
  return (
    <div
      style={{
        width: 0,
        height: 0,
        borderTop: `${size}px solid transparent`,
        borderLeft: `${size * 2}px solid #483248`,
        borderBottom: `${size}px solid transparent`,
      }}
    />
  );
};
