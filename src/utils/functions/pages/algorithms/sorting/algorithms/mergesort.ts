const mergesortHelper = (values: number[]) => {
  const n = values.length;
  if (n <= 1) {
    return values;
  }

  const middle = Math.floor(n / 2);

  const left = mergesortHelper(values.slice(0, middle));
  const right = mergesortHelper(values.slice(middle));

  let i = 0;
  let l = 0;
  let r = 0;
  while (l < left.length && r < right.length) {
    const leftVal = left[l];
    const rightVal = right[r];
    if (leftVal < rightVal) {
      values[i] = leftVal;
      l++;
    } else {
      values[i] = rightVal;
      r++;
    }
    i++;
  }

  while (l < left.length) {
    values[i] = left[l];
    l++;
    i++;
  }

  while (r < right.length) {
    values[i] = right[r];
    r++;
    i++;
  }

  return values;
};

export const mergesort = (values: number[]) => {
  mergesortHelper(values);
};
