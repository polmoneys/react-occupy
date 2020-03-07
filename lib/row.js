/**
 * React Occupy ⛱
 * @polmoneys  #2020#
 * version 1.0.0
 */

import React, { useState, useEffect } from "react";
import Spot from "./spot";

let NO__SPACING = "4px";

/**
 * CASE A : If <Row> has no shape, return spots
 * CASE B : If has shape we need to re-render with the new 'shaped' spots
 */

function Row(props) {
  let {
    cb,
    current,
    initialState,
    multi,
    rowId,
    spots,
    shape,
    spotComponent
  } = props;

  let [rowWithShape, makeRowFromShape] = useState(false);

  useEffect(() => {
    if (!shape) return; // CASE A

    let safeShape = shape.map(x => Number(x));
    let shapeCount = safeShape.reduce((a, b) => a + b, 0);

    if (shapeCount !== spots.length) {
      return; // BAIL OUT IF SHAPE MAKES NO SENSE
    }

    let shaped = safeShape.map((val, indx) => {
      let start =
        indx === 0 ? 0 : indx === 1 ? safeShape[indx - 1] : shapeCount - val;
      let end =
        indx === 0
          ? Number(val)
          : indx === 1
          ? safeShape[indx - 1] + Number(val)
          : shapeCount;
      return spots.slice(start, end);
    });

    makeRowFromShape(shaped);
  }, [shape]);

  function rowStyles() {
    let flexStyles = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    };
    let gridStyles = {
      display: "grid",
      gridColumnGap: NO__SPACING,
      gridTemplateColumns: `repeat(${spots.length},1fr)`
    };
    let gridSupport = window.CSS && CSS.supports("display:grid");
    return gridSupport && !shape ? gridStyles : flexStyles;
  }

  let { busySpots } = initialState;

  if (!shape)
    // CASE A
    return (
      <div
        style={{
          ...rowStyles()
        }}
      >
        {spots.map((spot, spotIndex) => {
          let spotId = `${rowId}-${spotIndex + 1}`; // human friendly index
          return !spotComponent ? (
            <Spot
              a11yTitle={`Select row ${rowId} seat ${spotIndex}`}
              key={spotId}
              cb={() => cb(spotId)}
              id={spotId}
              isBusy={busySpots?.includes(spotId)}
              isSelected={matchCurrentState(spotId)}
            />
          ) : (
            spotComponent({
              a11yTitle: `Select row ${rowId} seat ${spotIndex}`,
              cb: () => cb(spotId),
              id: spotId,
              isBusy: busySpots?.includes(spotId),
              isSelected: matchCurrentState(spotId)
            })
          );
        })}
      </div>
    );

  if (!rowWithShape) return null; // CASE B NEEDS TO WAIT WHILE NEW SHAPE IS BEING CALC'D

  function matchCurrentState(spotId) {
    if (multi) {
      let matches = current?.filter(c => `${c.row}-${c.spot}` === spotId);
      return matches && matches.length > 0 ? true : false;
    } else {
      return `${current.row}-${current.spot}` === spotId ? true : false;
    }
  }

  let seatId = (subRowIndex, spotIndex) => {
    if (subRowIndex === 0) {
      return `${rowId}-${spotIndex}`;
    } else if (subRowIndex === 2) {
      return `${rowId}-${rowWithShape[subRowIndex - 1].length +
        rowWithShape[subRowIndex - 2].length +
        spotIndex}`;
    } else {
      return `${rowId}-${rowWithShape[subRowIndex - 1].length + spotIndex}`;
    }
  };

  return (
    <div
      style={{
        ...rowStyles()
      }}
    >
      {rowWithShape?.map((subRow, subRowIndex) =>
        subRow.map((spot, spotIndex) => {
          let spotId = seatId(subRowIndex, spotIndex + 1); // human friendly index
          return !spotComponent ? (
            <Spot
              key={spotId}
              a11yTitle={`Select row and seat ${spotId}`}
              id={spotId}
              cb={() => cb(spotId)}
              isBusy={busySpots?.includes(spotId)}
              isLast={
                spotIndex + 1 === subRow.length &&
                subRowIndex + 1 !== shape.length
              }
              isSelected={matchCurrentState(spotId)}
            />
          ) : (
            spotComponent({
              a11yTitle: `Select row and seat ${spotId}`,
              id: spotId,
              cb: () => cb(spotId),
              isBusy: busySpots?.includes(spotId),
              isLast:
                spotIndex + 1 === subRow.length &&
                subRowIndex + 1 !== shape.length,
              isSelected: matchCurrentState(spotId)
            })
          );
        })
      )}
    </div>
  );
}

export default Row;
