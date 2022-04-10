import { ReactDom, Component } from '../which-react';
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
