
let workInProgressHook = null;
let currentlyRenderingFiber = null;

export function renderWithHooks(workInProgress) {
  currentlyRenderingFiber = workInProgress;
  currentlyRenderingFiber.memorizedState = null;
  workInProgressHook = null
}

function updateWorkInProgressHook() {
  let hook;
  if (false) {

  } else {
    hook = {
      memorizedState: null,
      next: null
    }
    if (workInProgressHook) {
      workInProgressHook = workInProgressHook.next = hook;
    } else {
      workInProgressHook = currentlyRenderingFiber.memorizedState = hook;
    }
  }
  return hook;
}

export function useReducer(reducer, initialState) {
  const hook = updateWorkInProgressHook();
  if (!currentlyRenderingFiber.alternate) {
    hook.memorizedState = initialState;
  }
  const dispatch = () => {}
  return [
    hook.memorizedState,
    dispatch
  ]
}

export function useState() {

}

