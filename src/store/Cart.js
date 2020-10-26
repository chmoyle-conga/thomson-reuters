
import { compact, values, merge, keyBy, groupBy, clone, get, filter, isNil, find, set } from 'lodash';

const initialState = {
    lines: [],
    loading: false,
    error: null,
    addedLines: null,
    total: null,
    cart: null,
    promotions: null
}


const cart = (state = initialState, action) => {
    console.log(action);
    switch (action.type){
        case CART_ACTION.START_FETCH:
            return { ...state, loading: true};

        case CART_ACTION.FINISH_FETCH:
            const s = { ...state, loading: false, lines: [...get(action, 'payload.LineItems', [])], cart: action.payload, total: groupBy(action.payload.SummaryGroups, 'LineType'), error: null }
            return s;

        case CART_ACTION.FAIL_FETCH:
            return { ...state, loading: false, error: action.payload }

        case CART_ACTION.FINISH_ADD:
            const newState = { ...state, loading: false, lines: [...state.lines, ...get(action, 'payload.LineItems', [])], addedLines: get(action, 'payload.LineItems', [])}
            return newState;

        case CART_ACTION.FINISH_PROMOTION_FETCH:
            const promoState = { ...state, loading: false, promotions: action.payload };
            return promoState;

        case CART_ACTION.CLEAR_ADDED:
            return {...state, addedLines: null};

        case CART_ACTION.FINISH_REMOVE:
            return {...state, loading: false, lines: state.lines.filter((l) => l.Id !== action.payload)}

        case CART_ACTION.PRICE_START:
            return { ...state, loading: true }

        case CART_ACTION.START_UPDATE:
            const line = find(state.lines, {Id: get(action, 'payload.CartItemId')});
            if(line)
                set(line, 'Quantity', get(action, 'payload.Quantity'));
            return {...state, lines: [...state.lines]};

        case CART_ACTION.SET_CART:
            return { ...state, cart: clone(action.payload)}

        case CART_ACTION.PRICE_FINISH:
            const lines = compact(values(merge(keyBy(state.lines, 'Id'), keyBy(get(action, 'payload.LineItems', []), 'Id'))));
            const ret = { ...state, total: groupBy(action.payload.SummaryGroups, 'LineType'), lines:  filter(lines, (l) => !isNil(l.Product)), loading: false}
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
    FINISH_PROMOTION_FETCH: 'FINISH_PROMO_FETCH',
    FINISH_ADD: 'FINISH_ADD',
    CLEAR_ADDED: 'CLEAR_ADDED',
    FINISH_REMOVE: 'FINISH_REMOVE',
    START_UPDATE: 'START_UPDATE',
    FINISH_UPDATE: 'FINISH_UPDATE',
    PRICE_START: 'PRICE_START',
    PRICE_FINISH: 'PRICE_FINISH',
    SET_CART: 'SET_CART'
};

export default cart;