export function peek(heap) {
  return heap.length === 0 ? null : heap[0]; 
}

export function push(heap,node) {
  const len = heap.length;
  heap.push(node);
  siftUp(heap,len);
}

export function pop(heap) {
  const first = peek(heap);
  if (!first) return null;
  const last = heap.pop();
  if (first !== last) {
    heap[0] = last;
    siftDown(heap, 0);
  }
  return first;
}

function siftUp(heap,pos) {
  while(pos > 0) {
    const parentPos = Math.ceil(pos/2) - 1;
    if (compare(heap[pos], heap[parentPos]) < 0) {
      const temp = heap[parentPos];
      heap[parentPos] = heap[pos];
      heap[pos] = temp;
      pos = parentPos;
    } else {
      return;
    }
  }
}

function siftDown(heap,pos) {
  while(pos < heap.length) {
    let left = (pos + 1) * 2 - 1;
    let right = (pos + 1) * 2;

    if (heap[left] && heap[right]) {
      let minPos = compare(heap[left], heap[right]) < 0 ? left : right;
      if (compare(heap[minPos],heap[pos]) < 0) {
        let temp = heap[minPos];
        heap[minPos] = heap[pos];
        heap[pos] = temp;
        pos = minPos;
      } else {
        return;
      }
    } else if (heap[left]) {
      if (compare(heap[left],heap[pos]) < 0) {
        let temp = heap[left];
        heap[left] = heap[pos];
        heap[pos] = temp;
        pos = left;
      } else {
        return
      }
    } else {
      return;
    }
  }
}

function compare(a,b) {
  return a - b;
}
