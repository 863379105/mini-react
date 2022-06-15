import { isString, Placement } from "./utils";
import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText,
} from "./ReactWorkTags";

export function createFiber(vdom, returnFiber) {
  let fiber = {
    type: vdom.type,
    key: vdom.key,
    props: vdom.props,
    child: null,
    sibling: null,
    stateNode: null,
    index: null,
    return: returnFiber,
    flags: Placement,

    alternate: null
  }

  const {type} = vdom;

  if (isString(type)) {
    fiber.tag = HostComponent;
  } else {
    fiber.tag = HostText;
  }

  return fiber;
}