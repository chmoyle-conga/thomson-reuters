
import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { compact, values, merge, keyBy, groupBy } from 'lodash';

const initialState = {
    lines: [],
    loading: false,
    error: null,
    addedLines: null,
    total: null
}

const cart = (state = initialState, action) => {
    console.log(action);
    switch (action.type){
        case CART_ACTION.START_FETCH:
            return { ...state, loading: true};

        case CART_ACTION.FINISH_FETCH:
            const s = { ...state, loading: false, lines: [...action.payload.LineItems], total: groupBy(action.payload.SummaryGroups, 'LineType'), error: null }
            return s;

        case CART_ACTION.FAIL_FETCH:
            return { ...state, loading: false, error: action.payload }

        case CART_ACTION.FINISH_ADD:
            const newState = { ...state, loading: false, lines: [...state.lines, ...action.payload.LineItems], addedLines: action.payload.LineItems}
            return newState;
           
        case CART_ACTION.CLEAR_ADDED:
            return {...state, addedLines: null};

        case CART_ACTION.FINISH_REMOVE:
            return {...state, loading: false, lines: state.lines.filter((l) => l.Id !== action.payload)}

        case CART_ACTION.PRICE_START:
            return { ...state, loading: true }

        case CART_ACTION.PRICE_FINISH:
            const ret = { ...state, total: groupBy(action.payload.SummaryGroups, 'LineType'), lines: compact(values(merge(keyBy(state.lines, 'Id'), keyBy(action.payload.LineItems, 'Id')))) }
            console.log(ret);
            return ret;

        case CART_ACTION.FINISH_UPDATE:
            for(let newLine of action.payload.LineItems){
                const index = state.lines.findIndex(i => i.Id === newLine.Id);
                if(~index)
                    state.lines[index] = newLine;
                else
                    state.lines.push(newLine);
            }
            return {...state, loading: false};

        default:
            return state;
    }
}


export const CART_ACTION = {
    START_FETCH: 'START_FETCH',
    FAIL_FETCH: 'FAIL_FETCH',
    FINISH_FETCH: 'FINISH_FETCH',
    FINISH_ADD: 'FINISH_ADD',
    CLEAR_ADDED: 'CLEAR_ADDED',
    FINISH_REMOVE: 'FINISH_REMOVE',
    FINISH_UPDATE: 'FINISH_UPDATE',
    PRICE_START: 'PRICE_START',
    PRICE_FINISH: 'PRICE_FINISH'
};


const store = createStore(
    combineReducers({
        cart
    })
    ,composeWithDevTools(applyMiddleware(thunk))
);



export default store;