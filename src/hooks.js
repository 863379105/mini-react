let currentlyRenderingFiber = null;
let workInProgressHook = null;

export function renderWithHooks(wip) {
  currentlyRenderingFiber = wip;
  currentlyRenderingFiber.memoizedState = null;
}

function updateWorkInProgressHook() {
  let hook;
  const current = currentlyRenderingFiber.alternate;
  if(current) {
    // update component
  } else {
    // init
    hook = {
      memoizedState: null,
      next: null
    }
    if(workInProgressHook) {
      workInProgressHook = workInProgressHook.next = hook
    } else {
      workInProgressHook = currentlyRenderingFiber.memoizedState = hook;
    }
  }
  return hook;
}

export function useReducer(reducer,initialState) {
  const dispatch = function() {
    console.log('ddd');
  }
  return [
    initialState,
    dispatch
  ]
}