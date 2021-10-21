
/** @jsx Didact.createElement */
// const element  = <h1 title="foo">Hello</h1>
// import {useState} from './hooks'

function run(){
  // const updateValue = e =>{
  //   rerender(e.target.value)
  // }
  function Counter() {
    const [state, setState] = lReact.useState('1');
    console.log('user',state);
    return lReact.createElement(
      "div",
      {},
      lReact.createElement('input',{state,onInput:(e)=>{
        setState(22)
        setState(33)
        setState(()=>e.target.value)
      }}),
      lReact.createElement('p',{},`hello ${state}`)
    )
  }
  // const rerender=(value)=>{
  const element  = Counter
  const container = document.getElementById("root")
  lReact.render(element,container)
  // rerender('world')
}


function createElement(type, props,...children) {
  return {
    type,
    props:{
      ...props,
      children:children.map((child)=>
        typeof child === "object"
          ?child
          :createTextElement(child)
      ),
    }
  }
}

createTextElement=(text)=>{
  return {
    type: "text",
    props:{
      nodeValue:text,
      children:[]
    }
  }
}

// 问题：一旦渲染开始，到渲染完成之前就不会停止，可能会阻塞主线程太久
// function render (element,container){
//   const dom =  element.type === "text"
//   ? document.createTextNode("")
//   :document.createElement(element.type)

//   const props = element.props
//   Object.keys(props)
//     .filter(key=>key!=="children")
//     .forEach(name=>{
//       dom[name] = props.name
//     })

//     props.children.forEach((child)=>{
//     render(child,dom)
//   })
//   container.appendChild(dom)
// }

let nextUnitOfWork = null
let wipRoot = null
let currentRoot = null
let deletions = null
let isMount = true;
let workInProgressHook = null;  // hook链表当前指针
let fiberBase = {
  memoizedState: null,
  element:null,
  container:null
}

requestIdleCallback(workLoop)

function getMountHook(initialstate){
  hook = {
    memoizedState: initialstate, // 这里代表一个hook里面的初始值的存储
    next:null,
    queue:{
      pending:null // 链表存储当前hook变化的过程
    }, 
  }
  if ( fiberBase&&fiberBase.memoizedState ) {
    workInProgressHook.next = hook
    
  }else {
    fiberBase.memoizedState = hook
  }
  workInProgressHook = hook  // hook链表当前指针
  return hook
}

function getUpdateHook(){
  hook = workInProgressHook
  workInProgressHook = workInProgressHook.next
  return hook
}

function render(element,container){
  fiberBase.element = element
  fiberBase.container = container
  wipRoot = {
    dom:container,
    props:{
      children:[element()]
    },
    alternate:currentRoot,
  }
  workInProgressHook = fiberBase.memoizedState||null;
  // console.log();
  console.log(wipRoot,2222);
  deletions = []
  nextUnitOfWork = wipRoot  // 直接改变nextUnitOfWork的状态，这样workLoop内会执行while内语句
  isMount = false 
}
// 小单元分解
function workLoop(deadline){
  let shouldYield = false // 记录剩余时间是否够用
  while(!shouldYield && nextUnitOfWork){
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining()<1
  }

  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}


function createDom (fiber){
  const dom =  fiber.type === "text"
  ? document.createTextNode("")
  :document.createElement(fiber.type)

  updateDom(dom,{},fiber.props)
  return dom
}
const isEvent = key => key.startsWith("on")
const isProperty = key =>
  key !== "children" && !isEvent(key)
const isNew = (prev, next) => key =>
  prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)
function updateDom(dom, prevProps, nextProps) {
  // TODO
 
  // Remove old properties
 //Remove old or changed event listeners
 Object.keys(prevProps)
 .filter(isEvent)
 .filter(
   key =>
     !(key in nextProps) ||
     isNew(prevProps, nextProps)(key)
 )
 .forEach(name => {
   const eventType = name
     .toLowerCase()
     .substring(2)
   dom.removeEventListener(
     eventType,
     prevProps[name]
   )
 })


  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ""
    })

  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })

  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })
}



// 构建fiber 节点 并返回下一个工作节点
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    // console.log(fiber,223);
    fiber.dom = createDom(fiber)
  }

  /**
   * 直接在这里添加，当执行被打断之后会出现渲染一半的页面。
   * 这个是有问题的。要处理成全部执行完毕再进行dom操作
   */
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom)
  // }

  
  const elements = fiber.props.children
  reconcileChildren(fiber,elements)

  // 一条自上而下再往上的链表走向，大致为 爷->父->孙->二孙->没有二孙找二叔->二叔儿子->没有找三叔
  //                                ->没有三叔找二爷->没有二爷再往上->再往上没有了就
  if(fiber.child){
    return fiber.child
  }
  let nextFiber = fiber
  while(nextFiber){
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
  // TODO add dom node
  // create new fiber

}

// 根据 新增、修改、删除构建不同的 fiber
function reconcileChildren(wipFiber,elements){
  let index = 0
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child
  let prevSibling = null
  // console.log(oldFiber,oldFiber!=null,oldFiber!==null);
  while(index<elements.length || oldFiber){
    const element = elements[index]
     
    // 直接按照新增走了，其实我们需要 删、改、增
    // const newFiber = {
    //   type:element.type,
    //   props:element.props,
    //   parent:fiber,
    //   dom:null
    // }
    let newFiber = null
    const sameType =
    oldFiber &&
      element &&
      element.type == oldFiber.type
    if (sameType) {
      // update
      newFiber = {
        type:oldFiber.type,
        props:element.props,
        parent:wipFiber,
        alternate:oldFiber,
        dom:oldFiber.dom,
        effectTag:"UPDATE"
      }
    }
    if (element && !sameType) {
      // add
      newFiber = {
        type:element.type,
        props:element.props,
        parent:wipFiber,
        alternate:null,
        dom:null,
        effectTag:"PLACEMENT"
      }
    }
    if (oldFiber && !sameType) {
      // delete
      oldFiber.effectTag = "DELETE"
      deletions.push(oldFiber)
    }

    if (oldFiber) {
      oldFiber=oldFiber.sibling
    }
    if (index===0) {
      // 定义child指针，指向第一个子节点
      wipFiber.child = newFiber
    }else if (element){
      // 定义前一个节点的兄弟指针为当前节点
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
}


commitRoot=()=>{
  deletions.forEach(commitWork)
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}

commitWork=(fiber)=>{
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  // console.log(fiber.dom!=null,fiber.dom!==null);
  if (fiber.effectTag ==="PLACEMENT" && fiber.dom!=null) {
    domParent.appendChild(fiber.dom)
  }else if (
    fiber.effectTag === "UPDATE" &&
    fiber.dom != null
  ) {
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )}else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom)
  }
  // const parentDom = fiber.parent.dom
  // parentDom.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}


function useState(initialstate) {
  let hook
  if (isMount) {
    hook = getMountHook(initialstate)
  } else{
    hook = getUpdateHook()
  }

  let baseState =  hook.memoizedState

  const updateLast = hook.queue.pending
  if (updateLast) {
    const startUpdate = updateLast.next
    let updateNow = startUpdate
    do{
      const action = updateNow.action
      baseState = typeof action === 'function'? action(baseState):action
      updateNow = updateNow.next
    } while(updateNow !== startUpdate)
    hook.queue.pending = null
  }
  hook.memoizedState = baseState
  console.log(hook.queue.pending,223332);
  return [baseState,dispatchAction.bind(null,hook.queue)]
}

function dispatchAction(queue,action){
  const update = {
    action,
    next:null
  }
  console.log(queue,action,223);
  if (queue.pending === null) {
    update.next = update
    // queue.pending = update
  }else{
    let preLast = queue.pending
    let start = queue.pending.next
    preLast.next = update
    update.next = start
    // queue.pending = update
  }
  queue.pending = update
  // console.log(queue.pending,223332);
  render(fiberBase.element,
    fiberBase.container)
}

const lReact = {
  createElement,
  render,
  useState
}
