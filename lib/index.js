/**
 * React Occupy ⛱
 * @polmoneys  #2020#
 * version 1.0.0
 */

import React, { useState, useEffect } from "react";
import Row from "./row";
import PropTypes from "prop-types";

function make2DArray(w, h, val = null) {
  const calc = Array.from({ length: h }).map(() =>
    Array.from({ length: w }).fill(val)
  );
  return new Promise(resolveIt => resolveIt(calc));
}

function Occupy(props) {
  let { initialRowIndex, rowCount, spotCount, multi = false } = props;

  let [isReady, showComponent] = useState(false);
  let [blueprint, makeBlueprint] = useState([]);
  let [selectedSpot, selectSpot] = useState([]);

  useEffect(() => {
    showComponent(false);
    make2DArray(spotCount, rowCount, 1).then(seed => {
      makeBlueprint(seed);
      showComponent(true);
    });
  }, [spotCount, rowCount]);

  useEffect(() => {
    selectSpot([]);
  }, [initialRowIndex]);

  function select(payload) {
    let splitAt = payload.indexOf("-");
    let row = payload.slice(0, splitAt);
    let spot = payload.replace(`${row}-`, "");

    if (multi) {
      let matches = selectedSpot?.filter(c => `${c.row}-${c.spot}` === payload);
      if (matches.length > 0) return;
      selectSpot(prev => [...prev, { spot: Number(spot), row: Number(row) }]);
    } else {
      selectSpot([
        {
          spot: Number(spot),
          row: Number(row)
        }
      ]);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyboardHandle);
    return () => {
      window.removeEventListener("keydown", keyboardHandle);
    };
  });

  function keyboardHandle(e) {
    if (multi) return;
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      let { spot, row } = selectedSpot[0];
      let nextSpot = spot;
      let nextRow = row;
      let hasChanged = false;

      if (e.key === "ArrowRight") {
        if (spot + 1 <= spotCount) {
          nextSpot = spot + 1;
          hasChanged = true;
        }
      } else if (e.key === "ArrowLeft") {
        if (spot - 1 >= 1) {
          nextSpot = spot - 1;
          hasChanged = true;
        }
      } else if (e.key === "ArrowUp") {
        if (row - 1 >= 1) {
          nextRow = row - 1;
          hasChanged = true;
        }
      } else {
        if (row < rowCount) {
          nextRow = row + 1;
          hasChanged = true;
        }
      }

      if (hasChanged) {
        document.activeElement.blur();
        let focusNext = document.querySelector(`#spot-${nextRow}-${nextSpot}`);
        window.requestAnimationFrame(() => {
          focusNext && focusNext.focus();
        });

        selectSpot([
          {
            spot: nextSpot,
            row: nextRow
          }
        ]);
      }
    }
  }

  if (!isReady) return null;

  return (
    <>
      {blueprint?.map((row, rowIndex) => (
        <Row
          key={rowIndex + initialRowIndex}
          cb={spotId => select(spotId)}
          rowId={rowIndex + initialRowIndex}
          spots={row}
          {...props}
          current={multi ? selectedSpot : selectedSpot?.[0] ?? []}
        />
      ))}
      {props.children &&
        props.children({
          select,
          selected: multi ? selectedSpot : selectedSpot?.[0] ?? []
        })}
    </>
  );
}

export default Occupy;

Occupy.propTypes = {
  initialRowIndex: PropTypes.number,
  rowCount: PropTypes.number.isRequired,
  spotCount: PropTypes.number.isRequired,
  shape: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  initialState: PropTypes.object
  // spotComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.bool])
};

Occupy.defaultProps = {
  rowCount: 4,
  spotCount: 8,
  shape: null,
  initialState: {},
  initialRowIndex: 1,
  spotComponent: false
};
