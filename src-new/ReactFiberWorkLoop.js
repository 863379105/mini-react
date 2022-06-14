let workInProgress = null;
let workInProgressRoot = null;


export function schedulerUpdateOnFiber(fiber) {
  workInProgress = fiber;
  workInProgressRoot = fiber;
}
