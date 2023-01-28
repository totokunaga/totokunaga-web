class MinHeap<T> {
  heap: T[];
  isLessThan: (one: T, two: T) => boolean;

  constructor(array: T[], isLessThan: (one: T, two: T) => boolean) {
    this.isLessThan = isLessThan;
    this.heap = this.buildHeap(array);
  }

  buildHeap(array: T[]) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  siftDown(currentIdx: number, endIdx: number, heap: T[]) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx =
        currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (
        childTwoIdx !== -1 &&
        this.isLessThan(heap[childTwoIdx], heap[childOneIdx])
      ) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }

      if (this.isLessThan(heap[idxToSwap], heap[currentIdx])) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  siftUp(currentIdx: number, heap: T[]) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (
      currentIdx > 0 &&
      this.isLessThan(heap[currentIdx], heap[parentIdx])
    ) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  peek() {
    return this.heap[0];
  }

  pop() {
    this.swap(0, this.heap.length - 1, this.heap);
    const valueToRemove = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return valueToRemove;
  }

  push(value: T) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }

  size() {
    return this.heap.length;
  }

  swap(i: number, j: number, heap: T[]) {
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }
}

export default MinHeap;
