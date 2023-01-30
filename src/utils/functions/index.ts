export const initMatrix = <T>(
  rowSize: number,
  colSize: number,
  initialValue: T
) => {
  const matrix: T[][] = Array.from({ length: rowSize }, () =>
    Array.from({ length: colSize }, () => initialValue)
  );

  return matrix;
};

export const getStripeSize = (width: number, maxStripeSize: number) => {
  let potentialStripeSizes = Array.from({ length: 2 }, () => 0);
  potentialStripeSizes = potentialStripeSizes.map((_, i) =>
    Math.max(0, maxStripeSize - i)
  );

  let smallestOffset = Infinity;
  let bestStripeSize = 0;
  let bestStripeAmount = 0;
  for (const potentialSize of potentialStripeSizes) {
    const stripes = width / potentialSize;
    const roundedOffStripes = Math.floor(stripes);
    const offset = width - roundedOffStripes * potentialSize;
    if (smallestOffset > offset) {
      smallestOffset = offset;
      bestStripeSize = potentialSize;
      bestStripeAmount = roundedOffStripes;
    }
  }

  return [bestStripeSize, bestStripeAmount];
};
