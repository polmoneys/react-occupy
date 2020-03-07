/**
 * React Occupy ⛱
 * @polmoneys  #2020#
 * version 1.0.0
 */

import React from "react";
import "../lib/spot.css";

function Spot({ a11yTitle, cb, id, isBusy = false, isSelected = false }) {
  return (
    <button
      style={{
        filter: isSelected
          ? "brightness(2)"
          : isBusy
          ? "brightness(.7) grayscale(90%)"
          : "none"
      }}
      disabled={isBusy}
      id={`spot-${id}`}
      onClick={cb}
      occupy-spot=""
    >
      <span className="offscreen">{a11yTitle}</span>
    </button>
  );
}

export default Spot;
