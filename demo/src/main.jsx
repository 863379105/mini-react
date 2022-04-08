import { ReactDom } from '../which-react';
import './index.css'
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
  </div>
);

const root = ReactDom.createRoot(document.getElementById('root'));

root.render(jsx);
