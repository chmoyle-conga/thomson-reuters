
import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
    lines: [],
    loading: false,
    error: null,
    addedLines: null
}

const cart = (state = initialState, action) => {
    switch (action.type){
        case CART_ACTION.START_FETCH:
            return { ...state, loading: true};

        case CART_ACTION.FINISH_FETCH:
            const s = { ...state, loading: false, lines: [...action.payload], error: null }
            return s;

        case CART_ACTION.FAIL_FETCH:
            return { ...state, loading: false, error: action.payload }

        case CART_ACTION.FINISH_ADD:
            const newState = { ...state, loading: false, lines: [...state.lines, ...action.payload.LineItems], addedLines: action.payload.LineItems}
            return newState;
           
        case CART_ACTION.CLEAR_ADDED:
            return {...state, addedLines: null};
        default:
            return state;
    }
}


export const CART_ACTION = {
    START_FETCH: 'START_FETCH',
    FAIL_FETCH: 'FAIL_FETCH',
    FINISH_FETCH: 'FINISH_FETCH',
    FINISH_ADD: 'FINISH_CHANGE',
    CLEAR_ADDED: 'CLEAR_ADDED'
};


const store = createStore(
    combineReducers({
        cart
    })
    ,composeWithDevTools(applyMiddleware(thunk))
);



export default store;