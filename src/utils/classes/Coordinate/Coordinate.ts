class Coordinate {
  row: number;
  col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  isEqual(target: Coordinate) {
    return this.row == target.row && this.col == target.col;
  }
}

export default Coordinate;
