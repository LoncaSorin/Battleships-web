import { inRange } from "lodash/number";

// Other resources
import { MAXIMUM_ROW_SIZE, MINIMUM_ROW_SIZE } from "../constants/general";

export const checkValidMapSize = (rowSize) => {
  return !isNaN(rowSize) && inRange(rowSize, MINIMUM_ROW_SIZE - 1, MAXIMUM_ROW_SIZE + 1);
}

export const generateMap = (rowSize) => {
  const map = [];
  const shipRowPosition = Math.floor(Math.random() * rowSize);
  const shipColumnPosition = Math.floor(Math.random() * rowSize);

  for (let row = 0; row < rowSize; row += 1) {
    const mapRow = [];

    for (let row = 0; row < rowSize; row += 1) {
      mapRow.push(false);
    }
    map.push(mapRow);
  }

  map[shipRowPosition][shipColumnPosition] = true;

  return map;
}
