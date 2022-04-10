import { createFiber } from "./ReactFiber";
import { isArray } from "./utils";

export function updateHostComponent(wip) {
  wip.stateNode = document.createElement(wip.type)
  Object.keys(wip.props).map(key => {
    if (key === 'children') {
      reconcilerChildren(wip.props[key], wip);
    } else {
      wip.stateNode[key] = wip.props[key];
    }
  })
}

export function updateFunctionComponet(wip) {
  const { type,props } = wip;
  let children = type(props);
  reconcilerChildren(children, wip);
}

export function updateClassComponet(wip) {
  const { type, props } = wip;
  const instance = new type(props)
  let children = instance.render();
  reconcilerChildren(children, wip);
}

export function updateHostText(wip) {
  console.log(wip);
  wip.stateNode = document.createTextNode(wip.props.children);
}
//TODO: FragmentComponent

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