import {
  updateClassComponet,
  updateFragmentComponent,
  updateFunctionComponet,
  updateHostComponent,
  updateHostTextComponent
} from "./ReactFiberReconciler";
import { Placement, Update, updateNode } from "./utils";
import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText,
} from "./ReactWorkTags";
import { scheduleCallback } from "./scheduler";

let wip = null;
let wipRoot = null;

export function schedulerUpdateOnFiber(fiber) {
  wip = fiber;
  wipRoot = fiber;
  scheduleCallback(workLoop);
}

function performUnitOfWork() {
  const { tag } = wip;
  switch(tag) {
    case HostComponent:
      updateHostComponent(wip);
      break;
    case FunctionComponent:
      updateFunctionComponet(wip);
      break;
    case ClassComponent:
      updateClassComponet(wip);
      break;
    case HostText:
      updateHostTextComponent(wip);
      break;
    case Fragment:
      updateFragmentComponent(wip);
      break;
    default:
      break;
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

function workLoop() {
  while (wip) {
    performUnitOfWork();
  }
  // if(wip) {
  //   window.requestIdleCallback(workLoop)
  // }
  if (!wip && wipRoot) {
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
  const { flags, stateNode, props } = wip;
  let parentNode = getParentNode(wip);
  if (flags & Placement && stateNode) {
    //TODO: 存在更新节点位置不对应问题
    parentNode.appendChild(stateNode)
  }
  if (flags & Update && stateNode) {
    updateNode(stateNode, wip.alternate.props, props)
  }
  if (wip.deletions) {
    commitDeletions(wip.deletions, stateNode || parentNode);
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

function commitDeletions(deletions, parentNode) {
  deletions.map(deletion => {
    parentNode.removeChild(getStateNode(deletion));
  })
}

function getStateNode(fiber) {
  const stateNode = fiber.stateNode;
  while(!stateNode) {
    stateNode = fiber.child.stateNode;
  }
  return stateNode;
}