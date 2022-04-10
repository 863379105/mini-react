import { isFn, isString, isUndefined, Placement } from "./utils";
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
  }

  const {type} = vdom;

  if (isString(type)) {
    fiber.tag = HostComponent;
  } else if(isFn(type)) {
    fiber.tag = type.prototype.isReactClassComponent ? ClassComponent : FunctionComponent;
  } else if(isUndefined(type)) {
    fiber.tag = HostText;
    fiber.props = {children:vdom};
  } else {
    fiber.tag = Fragment;
  }

  return fiber;
}
