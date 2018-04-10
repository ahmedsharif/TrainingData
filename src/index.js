import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore} from 'redux'
import reducer from './reducers'
//import { Provider } from 'react-redux'



//const store = createStore(reducer)

// console.log(store)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
