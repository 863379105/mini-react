import { schedulerUpdateOnFiber } from "../src/ReactFiberWorkLoop";

let currentlyRenderingFiber = null;
let workInProgressHook = null;

export function renderWithHooks(wip) {
  currentlyRenderingFiber = wip;
  currentlyRenderingFiber.memorizedState = null;
  workInProgressHook = null;
}

function updateWorkInProgressHook() {
  let hook;
  const current = currentlyRenderingFiber.alternate;
  if(current) {
    // update component
    currentlyRenderingFiber.memorizedState = current.memorizedState;
    if (workInProgressHook) {
      workInProgressHook = hook = workInProgressHook.next;
    } else {
      workInProgressHook = hook = currentlyRenderingFiber.memorizedState;
    }
  } else {
    // init
    hook = {
      memorizedState: null,
      next: null
    }
    if(workInProgressHook) {
      workInProgressHook = workInProgressHook.next = hook
    } else {
      workInProgressHook = currentlyRenderingFiber.memorizedState = hook;
    }
  }
  return hook;
}

export function useReducer(reducer,initialState) {
  const hook = updateWorkInProgressHook();
  if(!currentlyRenderingFiber.alternate) {
    hook.memorizedState = initialState;
  }
  const dispatch = function(action) {
    hook.memorizedState = reducer ? reducer(hook.memorizedState,action) : action
    currentlyRenderingFiber.alternate = { ...currentlyRenderingFiber };
    currentlyRenderingFiber.sibling = null;
    schedulerUpdateOnFiber(currentlyRenderingFiber);
  }
  return [
    hook.memorizedState,
    dispatch
  ]
}