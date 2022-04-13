// import { useState } from 'react';
import { ReactDom, Component, useReducer } from '../which-react';
import './index.css'

const initState = {
  counter: 0,
  show: true
}
const reducer = function(state, action) {
  const newState = { ...state };

  switch(action.type) {
    case 'addCounter':
      newState.counter += 1;
      break;
    case 'changeShow':
      newState.show = !newState.show;
      break
    default:
      break;
  }

  return newState;
}
const initState1 = {
  counter1: 0
}
const reducer1 = function(state, action) {
  const newState = { ...state };

  switch(action.type) {
    case 'addCounter1':
      newState.counter1 += 1;
      break;
    default:
      break;
  }

  return newState;
}
function FunctionComponent(props) {
  const { des } = props
  let [state,dispatch] = useReducer(reducer, initState)
  let [state1,dispatch1] = useReducer(reducer1, initState1)
  const changeShow = function() {
    dispatch({type: 'changeShow'})
  }
  const addCounter = function() {
    dispatch({type: 'addCounter'})
  }
  const addCounter1 = function() {
    dispatch1({type: 'addCounter1'})
  }
  return (
    <div>
      <h1 className={state.show ? 'font-bg-red' : 'font-bg-blue'}>FunctionComponent</h1>
      <p>{des}</p>
      <button onClick={changeShow}>changeShow</button>
      <button onClick={addCounter}>{state.counter}</button>
      <button onClick={addCounter1}>{state1.counter1}</button>
    </div>
  )
}

class ClassComponent extends Component {
  render() {
    return (
      <div>
        <h1>ClassComponent</h1>
        <p>{this.props.des}</p>
      </div>
    )
  }
}
function FragmentComponent() {
  return(
    <>
      <h1>FragmentComponent</h1>
      <p>this is Fragment Component</p>
    </>
  )
}
const jsx =  (
  <div className="border" id='app'>
    <div>
      <h1>react</h1>
      <a href="https://github.com/bubucuo/mini-react">mini react</a>
      <p>this is react</p>
    </div>
    <div>
      <h1>vue</h1>
      <p>this is vue</p>
    </div>
    <FunctionComponent des={'This is a Function Component'} />
    <ClassComponent des={'This is a Class Component'} />
    <FragmentComponent />
  </div>
);

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(jsx);
