import { updateFunctionComponet, updateHostComponent } from "./ReactFiberReconciler";
import { isFn, isString, Placement } from "./utils";

let wip = null;
let wipRoot = null;

export function schedulerUpdateOnFiber(fiber) {
  wip = fiber;
  wipRoot = fiber;
}

function performUnitOfWork() {
  const {type} = wip;
  if (isString(type)) {
    updateHostComponent(wip);
  } else if (isFn(type)) {
    updateFunctionComponet(wip)
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
    performUnitOfWork();
  }
  if(wip) {
    window.requestIdleCallback(workLoop)
  }
  if (!wip && wipRoot) {
    console.log(wipRoot);
    commitRoot()
  }
}

function commitRoot() {
  commitWorker(wipRoot);
  wipRoot = null;
}

function commitWorker(wip) {
  if (!wip) return;
  // 1. update self
  const { flags, stateNode } = wip;
  let parentNode = getParentNode(wip);
  if(flags === Placement && stateNode) {
    parentNode.appendChild(stateNode)
  }
  // 2. update child
  commitWorker(wip.child);
  // 3. update sibling
  commitWorker(wip.sibling);
}

function  getParentNode(wip) {
  let p = wip
  while (!p.return.stateNode) {
    p = p.return
  }
  return p.return.stateNode;
}

window.requestIdleCallback(workLoop)