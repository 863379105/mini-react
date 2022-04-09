import { ReactDom } from '../which-react';
import './index.css'

function FunctionComponent(props) {
  const { des } = props
  return (
    <div>
      <h1>FunctionComponent</h1>
      <p>{des}</p>
    </div>
  )
}

const jsx =  (
  <div className="border" id='app'>
    <div>
      <h1>react</h1>
      <a href="https://github.com/bubucuo/mini-react">mini react</a>
      <p>this is p</p>
    </div>
    <div>
      <h1>vue</h1>
      <p>this is p2</p>
    </div>
    <FunctionComponent des={'This is a Function Component'}></FunctionComponent>
    <div>
      <h1>Hello</h1>
    </div>
  </div>
);

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(jsx);
