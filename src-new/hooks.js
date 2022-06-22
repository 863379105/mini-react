import { schedulerUpdateOnFiber } from "./ReactFiberWorkLoop";

let workInProgressHook = null;
let currentlyRenderingFiber = null;

export function renderWithHooks(workInProgress) {
  currentlyRenderingFiber = workInProgress;
  currentlyRenderingFiber.memorizedState = null;
  workInProgressHook = null
}

function updateWorkInProgressHook() {
  let hook;
  const current = currentlyRenderingFiber.alternate;
  if (current) {
    // triggle hook, update fiber
    currentlyRenderingFiber.memorizedState = current.memorizedState;
    if (workInProgressHook) {
      hook = workInProgressHook.next;
      workInProgressHook = workInProgressHook.next;
    } else {
      workInProgressHook = current.memorizedState;
      hook = current.memorizedState;
    }
  } else {
    // init hook, init fiber
    hook = {
      memorizedState: null,
      next: null
    }
    if (workInProgressHook) {
      workInProgressHook.next = hook;
      workInProgressHook = hook;
    } else {
      workInProgressHook = hook;
      currentlyRenderingFiber.memorizedState = hook;
    }
  }
  return hook;
}

export function useReducer(reducer, initialState) {
  const hook = updateWorkInProgressHook();
  if (!currentlyRenderingFiber.alternate) {
    hook.memorizedState = initialState;
  }
  const dispatch = dispatchReducerAction(reducer, hook, currentlyRenderingFiber);
  return [
    hook.memorizedState,
    dispatch
  ]
}

export function useState() {

}

function dispatchReducerAction(reducer, hook, fiber) {
  const dispatch = (action) => {
    const newState = reducer(hook.memorizedState, action);
    hook.memorizedState = newState;
    fiber.alternate = {...fiber};
    fiber.sibling = null;
    // update fiber;
    schedulerUpdateOnFiber(fiber);
  }
  return dispatch;
}
