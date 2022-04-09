import { createFiber } from "./ReactFiber";
import { isArray } from "./utils";

export function updateHostComponent(wip) {
  if (wip.type === 'text') {
    wip.stateNode = document.createTextNode(wip.value);
    return;
  };
  wip.stateNode = document.createElement(wip.type)
  Object.keys(wip.props).map(key => {
    if (key === 'children') {
      const children = isArray(wip.props[key]) ? wip.props[key] : [wip.props[key]];
      reconcilerChildren(children,wip)
    } else {
      wip.stateNode[key] = wip.props[key];
    }
  })
}

function reconcilerChildren(children,parent) {
  let previousNewFiber = null;
  children.map((child,index) => {
    const newFiber = createFiber(child,parent);
    if (index == 0) {
      parent.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  })
}