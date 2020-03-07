/**
 * React Occupy ⛱
 * @polmoneys  #2020#
 * version 1.0.0
 */

import React from "react";
import "./spot.css";

function Spot({
  a11yTitle,
  cb,
  id,
  isBusy = false,
  isLast = false,
  isSelected = false
}) {
  return (
    <button
      disabled={isBusy}
      style={{
        marginRight: isLast ? "30px" : 0,
        cursor: isBusy ? "not-allowed" : "pointer",
        filter: isSelected
          ? "brightness(2)"
          : isBusy
          ? "brightness(.7) grayscale(90%)"
          : "none"
      }}
      id={`spot-${id}`}
      onClick={cb}
      occupy-spot=""
    >
      <span className="offscreen">{a11yTitle}</span>
    </button>
  );
}

export default Spot;
