import store, { CART_ACTION } from './Cart';
import { ApiService } from "../shared/Api";

const api = new ApiService();

const fetchStart = () => ({
    type: CART_ACTION.START_FETCH
})

const fetchFinish = data => ({
    type: CART_ACTION.FINISH_FETCH,
    payload: data
})

const fetchFail = error => ({
    type: CART_ACTION.FAIL_FETCH,
    payload: error
})

const addFinish = data => ({
    type: CART_ACTION.FINISH_ADD,
    payload: data
})

export default {
    refresh: () => {
        store.dispatch(async dispatch => {
            dispatch(fetchStart());
            try{    
                const cartId = localStorage.getItem('cartId');
                if(!cartId){
                    const cartList = await api.post('/carts', {});
                    localStorage.setItem('cartId', cartList[0].Id);
                    dispatch(fetchFinish(cartList[0]));
                }else{
                    const data = await api.get(`/cartitems?condition[0]=ConfigurationId,Equal,${cartId}&lookups=Product`);
                    dispatch(fetchFinish(data));
                }    
            }catch(error){
                dispatch(fetchFail(error));
            }
        })
    },

    addToCart: (productId, quantity) => {
        store.dispatch(async dispatch => {
            dispatch(fetchStart());
            
            try{
                const cartId = localStorage.getItem('cartId');
                const data = await api.post(`/carts/${cartId}/items?price=skip`, {
                    ProductId: productId,
                    Quantity: quantity
                });
                dispatch(addFinish(data));
            }catch(error){
                dispatch(fetchFail(error));
            }
        })
    },

    clearAddedLines: () => {
        store.dispatch({type: CART_ACTION.CLEAR_ADDED});
    }
}