class Coordinate {
  row: number;
  col: number;
  grid: number[][];

  constructor(row: number, col: number, grid: number[][]) {
    this.row = row;
    this.col = col;
    this.grid = grid;
  }

  isEqual(target: Coordinate) {
    return this.row == target.row && this.col == target.col;
  }

  isInbound() {
    const isRowInbound = this.row >= 0 && this.row < this.grid.length;
    const isColInbound = this.col >= 0 && this.col < this.grid[0].length;
    return isRowInbound && isColInbound;
  }

  getManhattanDistanceFrom(target: Coordinate) {
    const rDiff = Math.abs(this.row - target.row);
    const cDiff = Math.abs(this.col - target.col);
    return rDiff + cDiff;
  }
}

export default Coordinate;
