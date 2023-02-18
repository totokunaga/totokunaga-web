const mergesortHelper = (values: number[], start: number, end: number) => {
  if (end - start <= 1) {
    return values;
  }

  const middle = Math.floor((start + end) / 2);

  mergesortHelper(values, start, middle - 1);
  mergesortHelper(values, middle, end);

  let i = start;
  let l = start;
  let r = middle;
  while (l < middle && r < end + 1) {
    const leftVal = values[l];
    const rightVal = values[r];
    if (leftVal < rightVal) {
      values[i] = leftVal;
      l++;
    } else {
      values[i] = rightVal;
      r++;
    }
    i++;
  }

  while (l < middle) {
    values[i] = values[l];
    l++;
    i++;
  }

  while (r < end + 1) {
    values[i] = values[r];
    r++;
    i++;
  }

  return values;
};

export const mergesort = (values: number[]) => {
  mergesortHelper(values, 0, values.length - 1);
};
