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
      reconcilerChildren(wip.props[key], wip);
    } else {
      wip.stateNode[key] = wip.props[key];
    }
  })
}

function reconcilerChildren(children,parent) {
  children = isArray(children) ? children : [children];
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

export function updateFunctionComponet(wip) {
  const { type,props } = wip;
  let children = type(props);
  
  reconcilerChildren(children, wip);
}