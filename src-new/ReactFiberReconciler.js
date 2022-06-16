import { createFiber } from "./ReactFiber";
import { isStringOrNumber, updateNode, isArray } from "./utils";

export function updateHostComponent(workInProgress) {
  let { type, props } = workInProgress;
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = document.createElement(type);
    updateNode(workInProgress.stateNode, {} , props)
    function updateNode(dom, previousProps, props) {
      Object.keys(props).map(key => {
        if (key !== 'children') {
          dom[key] = props[key];
        }
      })
    }
    reconcilerChildren(props.children, workInProgress);
  }
}

export function updateHostTextComponent(workInProgress) {

}

export function updateFunctionComponet(workInProgress) {
  const { type, props } = workInProgress;
  const children = type(props);
  reconcilerChildren(children, workInProgress);
}

function reconcilerChildren(children, parent) {
  if (isStringOrNumber(children)) {
    parent.stateNode.textContent += children;
    return;
  }
  children = isArray(children) ? children : [children];
  let previousNewFiber = null;
  children.map((child, index) => {
    const newFiber = createFiber(child, parent);
    if (index === 0) {
      parent.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  })
}