import { peek, pop, push } from "./miniHeap";

const taskQueue = [];
let taskIdCounter = 1;

export function scheduleCallback(callback) {
  const currentTime = getCurrentTime();
  
  //TODO: timeOut timerTask;
  let priortyLevel = 1;
  let timeout = -1;;
  let startTime = currentTime;
  let expirationTime = startTime + timeout;

  const newTask = {
    id:taskIdCounter++,
    priortyLevel,
    startTime,
    expirationTime,
    sortIndex: -1,
    callback
  }
  if(startTime > currentTime) {

  } else {
    newTask.sortIndex = expirationTime;
    push(taskQueue, newTask);

    // request dispatch
    requestHostCallback();
  }
}

//TODO: 未设置宏任务
function requestHostCallback() {
  let currentTask = peek(taskQueue);
  while(currentTask) {
    const callback = currentTask.callback;
    currentTask.callback = null;
    callback();
    pop(taskQueue);
    currentTask = peek(taskQueue);
  }
}

function getCurrentTime() {
  return performance.now();
}