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
    default:
      break;
  }

  return newState;
}
function FunctionComponent(props) {
  const { des } = props
  let [state,dispatch] = useReducer(reducer, initState)

  const addCounter = function() {
    dispatch({type: 'addCounter'})
  }

  return (
    <div>
      <h1>FunctionComponent</h1>
      <p>{des}</p>
      <button onClick={addCounter}>add:{state.counter}</button>
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
    <>
      <h1>FragmentComponent</h1>
      <p>this is Fragment Component</p>
    </>
  </div>
);

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(jsx);
