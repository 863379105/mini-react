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

function requestHostCallback() {
  port.postMessage(null);
}

// create js Task
const channel = new MessageChannel();
const port = channel.port2;
channel.port1.onmessage = function() {
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