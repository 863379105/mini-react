import { isString, Placement } from "./utils";

export function createFiber(vdom, returnFiber) {
  let fiber = {
    child: null,
    sibling: null,
    stateNode: null,
    index: null,
    return: returnFiber,

    flags: Placement,
  }
  if (isString(vdom)) {
    fiber = {
      ...fiber,
      type: 'text',
      value: vdom,
      key: null,
    }
  } else {
    fiber = {
      ...fiber,
      type: vdom.type,
      key: vdom.key,
      props: vdom.props,
    }
  }
  
  return fiber;
}
