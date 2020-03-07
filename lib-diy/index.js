/**
 * React Occupy ⛱
 * @polmoneys  #2020#
 * version 1.0.0
 */

import React, { useState, useEffect } from "react";
import Row from "./diy-row";
import PropTypes from "prop-types";

function Occupy(props) {
  let { initialState } = props;

  let [isReady, showComponent] = useState(false);
  let [blueprint, makeBlueprint] = useState([]);
  let [selectedSpot, selectSpot] = useState({});

  useEffect(() => {
    makeBlueprint(initialState.map);
    showComponent(true);
  }, []);

  function select(payload) {
    let splitAt = payload.indexOf("-");
    let row = payload.slice(0, splitAt);
    let spot = payload.replace(`${row}-`, "");
    selectSpot({
      spot: Number(spot),
      row: Number(row)
    });
  }
  useEffect(() => {
    window.addEventListener("keydown", keyboardHandle);
    return () => {
      window.removeEventListener("keydown", keyboardHandle);
    };
  });

  function keyboardHandle(e) {
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      let { spot, row } = selectedSpot;

      let nextSpot = spot;
      let nextRow = row;
      let hasChanged = false;

      if (e.key === "ArrowRight") {
        let safeSpotCount = blueprint[row - 1].filter(x => x !== 0).length;
        if (spot + 1 <= safeSpotCount) {
          nextSpot = spot + 1;
          hasChanged = true;
        }
      } else if (e.key === "ArrowLeft") {
        if (spot - 1 > 0) {
          nextSpot = spot - 1;
          hasChanged = true;
        }
      } else if (e.key === "ArrowUp") {
        let safeSpotCount = blueprint[nextRow - 2]?.filter(x => x !== 0).length;
        if (row - 1 !== 0 && safeSpotCount >= spot) {
          nextRow = row - 1;
          hasChanged = true;
        }
      } else if (e.key === "ArrowDown") {
        let safeSpotCount = blueprint[nextRow]?.filter(x => x !== 0).length;
        let rowCount = blueprint.length;
        if (row + 1 <= rowCount + 1 && safeSpotCount >= spot) {
          nextRow = row + 1;
          hasChanged = true;
        }
      }

      if (hasChanged) {
        // MANAGE FOCUS
        document.activeElement.blur();
        let focusNext = document.querySelector(`#spot-${nextRow}-${nextSpot}`);
        window.requestAnimationFrame(() => {
          focusNext && focusNext.focus();
        });

        selectSpot({
          spot: nextSpot,
          row: nextRow
        });
      }
    }
  }

  if (!isReady) return null;

  return (
    <>
      {blueprint?.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          cb={spotId => select(spotId)}
          rows={blueprint.length}
          rowId={rowIndex + 1} // human friendly index based
          spots={row}
          current={selectedSpot}
          {...props}
        />
      ))}
      {props.children &&
        props.children({
          select,
          selected: selectedSpot
        })}
    </>
  );
}

export default Occupy;

Occupy.propTypes = {
  initialState: PropTypes.object
  // spotComponent:PropTypes.oneOfType([ PropTypes.element, PropTypes.bool])
};

Occupy.defaultProps = {
  initialState: {},
  spotComponent: false
};
