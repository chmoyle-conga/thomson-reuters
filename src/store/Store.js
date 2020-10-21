import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import cart from './Cart';

const store = createStore(
    combineReducers({
        cart
    })
    ,composeWithDevTools(applyMiddleware(thunk))
  );

export default store;