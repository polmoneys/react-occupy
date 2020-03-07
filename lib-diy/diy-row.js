/**
 * React Occupy ⛱
 * @polmoneys  #2020#
 * version 1.0.0
 */

import React from "react";
import Spot from "./diy-spot";

let NO__SPACING = "4px";

function RowWithMemo(props) {
  let { cb, current, initialState, rowId, spots, spotComponent } = props;

  let spotRefIndex = 0;

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
    return gridSupport ? gridStyles : flexStyles;
  }

  let { busySpots } = initialState;

  return (
    <div
      style={{
        ...rowStyles()
      }}
    >
      {spots.map((spot, spotIndex) => {
        if (spot === 0) {
          return <div occupy-spot="dummy" key={spotIndex}></div>;
        } else {
          let safeSpotIndex = Number(++spotRefIndex);
          let spotId = `${rowId}-${safeSpotIndex}`;
          return !spotComponent ? (
            <Spot
              a11yTitle={`Select row ${rowId} seat ${safeSpotIndex}`}
              key={spotId}
              id={spotId}
              cb={() => cb(spotId)}
              isBusy={busySpots?.includes(spotId)}
              isSelected={spotId === `${current.row}-${current.spot}`}
            />
          ) : (
            spotComponent({
              a11yTitle: `Select row ${rowId} seat ${safeSpotIndex}`,
              cb: () => cb(spotId),
              id: spotId,
              isBusy: busySpots?.includes(spotId),
              isSelected: spotId === `${current.row}-${current.spot}`
            })
          );
        }
      })}
    </div>
  );
}

const avoidRerenderIf = (prevProps, nextProps) => {
  return prevProps.rowId === nextProps.rowId;
};
let Row = React.memo(props => <RowWithMemo {...props} />, avoidRerenderIf);

export default Row;
