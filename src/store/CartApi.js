import store, { CART_ACTION } from './Cart';
import { ApiService } from "../shared/Api";

const api = new ApiService();

const fetchStart = () => ({
    type: CART_ACTION.START_FETCH
});

const fetchFinish = data => ({
    type: CART_ACTION.FINISH_FETCH,
    payload: data
});

const fetchFail = error => ({
    type: CART_ACTION.FAIL_FETCH,
    payload: error
});

const addFinish = data => ({
    type: CART_ACTION.FINISH_ADD,
    payload: data
});

const removeFinish = data => ({
    type: CART_ACTION.FINISH_REMOVE,
    payload: data
});

const updateFinish = data => ({
    type: CART_ACTION.FINISH_UPDATE,
    payload: data
});

const priceStart = data => ({
    type: CART_ACTION.PRICE_START
})

const priceFinish = data => ({
    type: CART_ACTION.PRICE_FINISH,
    payload: data
})

const CartApi = {
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
                    const data = await api.get(`/carts/${cartId}`);
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
                const data = await api.post(`/carts/${cartId}/items?price=skip&rules=skip&lookups=ProductId`, {
                    ProductId: productId,
                    Quantity: quantity
                });
                dispatch(addFinish(data));
                CartApi.priceCart();
            }catch(error){
                dispatch(fetchFail(error));
            }
        })
    },

    updateCartItem: (cartItemId, quantity, primaryLineNumber, optionId) => {
        store.dispatch(async dispatch => {
            dispatch(fetchStart());

            try{
                const cartId = localStorage.getItem('cartId');
                const data = await api.put(`/carts/${cartId}/items/${cartItemId}?price=skip&rules=skip&lookups=ProductId`, {
                    LineItem : {
                        Id: cartItemId,
                        Apttus_Config2__Quantity__c : quantity,
                        Apttus_Config2__PrimaryLineNumber__c: primaryLineNumber,
                        Apttus_Config2__OptionId__c: optionId
                    }
                });
                dispatch(updateFinish(data));
                CartApi.priceCart();
            }catch(error){
                dispatch(fetchFail(error));
            }
        })
    },

    removeFromCart: (lineItemId) => {
        store.dispatch(async dispatch => {
            dispatch(fetchStart());

            try{
                const cartId = localStorage.getItem('cartId');
                await api.del(`/carts/${cartId}/items/${lineItemId}`);
                dispatch(removeFinish(lineItemId));
                CartApi.priceCart();
            }catch(error){
                dispatch(fetchFail(error));
            }
        })
    },

    priceCart: () => {
        store.dispatch(async dispatch => {
            dispatch(priceStart());
            try{
                const cartId = localStorage.getItem('cartId');
                const data = await api.post(`/carts/${cartId}/price?mode=turbo`);
                dispatch(priceFinish(data));
            }catch(error){
                dispatch(fetchFail(error));
            }
        });
    },

    clearAddedLines: () => {
        store.dispatch({type: CART_ACTION.CLEAR_ADDED});
    }
}

export default CartApi;