import { updateHostComponent } from "./ReactFiberReconciler";

let wip = null;
let wipRoot = null;

export function schedulerUpdateOnFiber(fiber) {
  wip = fiber;
  wipRoot = fiber;
}

function performUnitOfWork() {
  const {type} = wip;
  if (typeof type === 'string') {
    updateHostComponent(wip);
  }
  if (wip.child) {
    wip = wip.child;
    return;
  }

  let next = wip;
  while (next) {
    if (next.sibling) {
      wip = next.sibling;
      return;
    }
    next = next.return;
  }
  wip = null;
}

function workLoop(IdleDeadline) {
  while (wip && IdleDeadline.timeRemaining() > 0) {
    console.log(IdleDeadline.timeRemaining());
    performUnitOfWork();
  }
  if (!wip && wipRoot) {
    commitRoot()
  }
}

function commitRoot() {
  console.log(wipRoot);
  commitWorker(wipRoot);
  wipRoot = null;
}

function commitWorker(wip) {
  if (!wip) return;
  // 1. update self
  const { flags, stateNode } = wip;
  let parentNode = wip.return.stateNode;
  if(flags === 'Placement' && stateNode) {
    parentNode.appendChild(stateNode)
  }
  // 2. update child
  commitWorker(wip.child);
  // 3. update sibling
  commitWorker(wip.sibling);
}

window.requestIdleCallback(workLoop)