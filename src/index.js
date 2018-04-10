import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore} from 'redux'
import reducer from './reducers'
import { Provider, connect } from 'react-redux'



const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

console.log(store)

ReactDOM.render(
<Provider store={store}>
    <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
