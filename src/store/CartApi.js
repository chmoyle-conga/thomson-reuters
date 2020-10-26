import { CART_ACTION } from './Cart';
import store from './Store';
import { ApiService } from "../shared/Api";
import { find, first, get, isEmpty, isNil, join, map, uniq, compact, flatten} from 'lodash';

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

const promoFinish = data => ({
    type: CART_ACTION.FINISH_PROMOTION_FETCH,
    payload: data
})

const priceFinish = data => ({
    type: CART_ACTION.PRICE_FINISH,
    payload: data
})

const updateStart = data => ({
    type: CART_ACTION.START_UPDATE,
    payload: data
})

const cartItemLookups = `ProductId,PriceListItemId`;

const CartApi = {
    refresh: () => {
        store.dispatch(async dispatch => {
            dispatch(fetchStart());
            try{    
                const cartId = localStorage.getItem('cartId');
                
                const cart = (isNil(cartId)) ? first(await api.post(`/carts?children=SummaryGroups&lookups=AccountId,ShipToAccountId`, {})) : await api.get(`/carts/${cartId}?children=SummaryGroups&lookups=AccountId,ShipToAccountId`);
                localStorage.setItem('cartId', cart.Id);
                if(cartId)
                    cart.LineItems = await api.get(`/cartitems?condition[0]=ConfigurationId,Equal,${cartId}&lookups=${cartItemLookups}&children=AdjustmentLineItems`);
                
                dispatch(fetchFinish(cart));
                CartApi.fetchPromotions();
            }catch(error){
                dispatch(fetchFail(error));
            }
        })
    },

    fetchPromotions: () => {
        store.dispatch(async dispatch => {
            const adjustmentLineItems = flatten(map(store.getState().cart.lines, 'AdjustmentLineItems'));
            const incentiveIds = compact(uniq(map(adjustmentLineItems, 'IncentiveId')));
            if(!isEmpty(incentiveIds)){
                const incentives = await api.post(`/apttus_config2__incentive__c/query`, {
                    conditions : [
                        {
                            field: 'Id',
                            filterOperator: 'In',
                            value: join(incentiveIds, ',')
                        }
                    ]
                });
                dispatch(promoFinish(incentives));
            }else
                dispatch(promoFinish(null));
        });
    },

    applyPromotion: (couponCode) => {
        store.dispatch(async dispatch => {
            dispatch(fetchStart());
            try{
                const cartId = localStorage.getItem('cartId');
                const data = await api.post(`/carts/${cartId}/promotions?mode=turbo&price=default`, {
                    code: couponCode
                })
                dispatch(priceFinish(get(data, 'CartResponse')));
                CartApi.fetchPromotions();
            }catch(error){
                dispatch(fetchFail(error));
            }
        });
    },

    removePromotion: (couponCode) => {
        store.dispatch(async dispatch => {
            dispatch(fetchStart());
            try{
                const cartId = localStorage.getItem('cartId');
                const data = await api.del(`/carts/${cartId}/promotions/${couponCode}?mode=turbo&price=default`);
                dispatch(priceFinish(get(data, 'CartResponse')));
                CartApi.fetchPromotions();
            }catch(error){
                dispatch(fetchFail(error));
            }
        });
    },

    /**
     * Add to cart method
     */
    addToCart: (productId, quantity, priceListItemId) => {
        store.dispatch(async dispatch => {
            dispatch(fetchStart());
            
            try{
                const cartId = localStorage.getItem('cartId');
                const cart = store.getState().cart;

                // Find the existing line item in the cart.
                const cartItem = find(get(cart, 'lines'), {ProductId : productId});
                let data;

                // Update the quantity of the line item if it exists
                if(!isNil(cartItem))
                    data = await api.put(`/carts/${cartId}/items/${cartItem.Id}?price=skip&rules=skip&lookups=${cartItemLookups}`, {
                        LineItem : {
                            Id : cartItem.Id,
                            Apttus_Config2__Quantity__c : cartItem.Quantity + quantity,
                            Apttus_Config2__PrimaryLineNumber__c: cartItem.PrimaryLineNumber,
                            Apttus_Config2__OptionId__c: null,
                            Apttus_Config2__PriceListItemId__c : priceListItemId,
                            Apttus_Config2__PricingStatus__c: 'Pending',
                            QFTotalqty__c: quantity,
                            TotalQuantity: quantity
                        }
                    })
                
                // Otherwise add the new item to the cart
                else
                    data = await api.post(`/carts/${cartId}/items?price=skip&rules=skip&lookups=${cartItemLookups}`, {
                        ProductId: productId,
                        Quantity: quantity,
                        LineItem : {
                            Apttus_Config2__PriceListItemId__c : priceListItemId,
                            QFTotalqty__c: quantity,
                            TotalQuantity: quantity 
                        }
                    });

                dispatch(addFinish(data));
                CartApi.priceCart(true);
            }catch(error){
                dispatch(fetchFail(error));
            }
        });
    },

    updateCartItem: (cartItemId, quantity, primaryLineNumber, optionId) => {
        store.dispatch(async dispatch => {
            dispatch(updateStart({
                CartItemId: cartItemId,
                Quantity: quantity,
                TotalQuantity: quantity
            }));

            try{
                const cartId = localStorage.getItem('cartId');
                const data = await api.put(`/carts/${cartId}/items/${cartItemId}?price=skip&rules=skip&lookups=${cartItemLookups}`, {
                    LineItem : {
                        Id: cartItemId,
                        Apttus_Config2__Quantity__c : quantity,
                        Apttus_Config2__PrimaryLineNumber__c: primaryLineNumber,
                        Apttus_Config2__OptionId__c: optionId,
                        Apttus_Config2__PricingStatus__c: 'Pending',
                        QFTotalqty__c: quantity,
                        TotalQuantity: quantity
                    }
                });
                dispatch(updateFinish(data));
                CartApi.priceCart(true);
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
                await api.del(`/carts/${cartId}/items/${lineItemId}?price=skip&rules=skip`);
                dispatch(removeFinish(lineItemId));
                CartApi.priceCart(true);
            }catch(error){
                dispatch(fetchFail(error));
            }
        })
    },

    priceCart: (promotions) => {
        store.dispatch(async dispatch => {
            dispatch(priceStart());
            try{
                const cartId = localStorage.getItem('cartId');
                const data = await api.post(`/carts/${cartId}/price?mode=turbo`);
                dispatch(priceFinish(data));

                if(promotions)
                    CartApi.fetchPromotions();
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