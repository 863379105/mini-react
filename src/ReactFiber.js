export function createFiber(vnode,returnFiber) {
  const fiber = {
    type: vnode.type,
    key: vnode.key,
    props: vnode.props,
    // 对应的当前 dom 
    stateNode: null,

    // fiber 的第一个子节点
    child: null,
    // fiber 的兄弟节点
    sibling: null,
    // fiber 的父节点
    return: returnFiber,

    // 标记 fiber 的类型
    flags: 'Placement',
    index: null
  }
  return fiber
}