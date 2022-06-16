import { Placement } from "./utils";
import {
  FunctionComponent,
  HostComponent
} from "./ReactWorkTags";
import { updateFunctionComponet, updateHostComponent } from '../src-new/ReactFiberReconciler'

let workInProgress = null;
let workInProgressRoot = null;


export function schedulerUpdateOnFiber(fiber) {
  workInProgress = fiber;
  workInProgressRoot = fiber;
}

// 1. perform current fiber
// 2. update current fiber
function performUnitOfWork() {
  const { tag } = workInProgress;
  switch(tag) {
    case HostComponent:
      updateHostComponent(workInProgress);
      break;
    case FunctionComponent:
      updateFunctionComponet(workInProgress);
    default: 
      break;
  }
  if (workInProgress.child) {
    workInProgress = workInProgress.child;
    return;
  }
  let next = workInProgress;
  while (next) {
    if (next.sibling) {
      workInProgress = next.sibling;
      return;
    }
    next = next.return;
  }
  workInProgress = null;
}

function workLoop(IdleDeadline) {
  while(workInProgress && IdleDeadline.timeRemaining() > 0) {
    performUnitOfWork();
  }
  if (workInProgress) {
    requestIdleCallback(workLoop);
  }
  if (!workInProgress && workInProgressRoot) {
    commitRoot();
  }
}

function commitRoot() {
  commitWorker(workInProgressRoot);
  workInProgressRoot = null;
}

function commitWorker(fiber) {
  // commit self
  if (!fiber) return;
  const { flags, stateNode } = fiber;
  const parentNode = getParentNode(fiber);
  if (flags && Placement && stateNode) {
    parentNode.appendChild(stateNode);
  }
  // commit child
  commitWorker(fiber.child);
  // commit sibling
  commitWorker(fiber.sibling)
}

function getParentNode(fiber) {
  let p = fiber;
  while (!p.return.stateNode) {
    p = p.return;
  }
  return p.return.stateNode;
}

requestIdleCallback(workLoop);