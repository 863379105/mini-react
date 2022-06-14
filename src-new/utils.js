// ! flags
export const NoFlags = /*                      */ 0b00000000000000000000;

export const Placement = /*                    */ 0b0000000000000000000010; // 2
export const Update = /*                       */ 0b0000000000000000000100; // 4
export const Deletion = /*                     */ 0b0000000000000000001000; // 8

export function isString(s) {
  return typeof s === "string";
}

export function isStringOrNumber(s) {
  return typeof s === "string" || typeof s === "number";
}

export function isFn(fn) {
  return typeof fn === "function";
}

export function isUndefined(s) {
  return s === undefined;
}

export function isArray(arr) {
  return Array.isArray(arr);
}

export function updateNode(node, prevProps, nextProps) {
  // delete old attribute
  Object.keys(prevProps).forEach(key => {
    if (key === 'children') {
      if(isStringOrNumber(prevProps[key])) {
        node.textContent = '';
      }
    } else if(key.slice(0,2) === 'on') {
        const eventName = key.slice(2).toLocaleLowerCase()
        node.removeEventListener(eventName,prevProps[key])
    } else {
      if (!(key in nextProps)) {
        node.removeAttribute(key);
      }
    }
  })
  // update new attribute
  Object.keys(nextProps).forEach(key => {
    if (key === 'children') {
      if(isStringOrNumber(nextProps[key])) {
        node.textContent = nextProps[key] + '';
      }
    } else if(key.slice(0,2) === 'on') {
      const eventName = key.slice(2).toLocaleLowerCase()
      node.addEventListener(eventName,nextProps[key])
    } else {
      node[key] = nextProps[key];
    }
  })
}