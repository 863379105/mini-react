import { renderWithHooks } from "./hooks";
import { createFiber } from "./ReactFiber";
import { isArray, isStringOrNumber, Update, updateNode } from "./utils";

export function updateHostComponent(wip) {
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type)
    updateNode(wip.stateNode, {}, wip.props);
  }
  reconcilerChildren(wip.props.children, wip);
}

export function updateFunctionComponet(wip) {
  renderWithHooks(wip)
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

export function updateHostTextComponent(wip) {
  wip.stateNode = document.createTextNode(wip.props.children);
}

export function updateFragmentComponent(wip) {
  reconcilerChildren(wip.props.children, wip);
}

function reconcilerChildren(children,parent) {
  if (isStringOrNumber(children)) {
    return;
  }
  children = isArray(children) ? children : [children];
  
  let oldFiber = parent.alternate && parent.alternate.child;

  let previousNewFiber = null;
  children.map((child,index) => {
    const newFiber = createFiber(child,parent);
    //TODO: diff 比较
    const same = sameNode(newFiber,oldFiber)
    if (same) {
      Object.assign(newFiber, {
        stateNode: oldFiber.stateNode,
        alternate: oldFiber,
        flags: Update
      })
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index == 0) {
      parent.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  })
}

function sameNode(a,b) {
  return a && b && a.type === b.type && a.key === b.key
}
