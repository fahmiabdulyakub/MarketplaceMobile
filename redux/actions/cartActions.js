import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, UPDATE_ITEM_TO_CART, FETCH_CART_DATA } from './types';

export const addToCart = (item) => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: item
    })
}

export const removeItem = (item) => dispatch => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: item
    })
}

export const emptyCart = () => dispatch => {
    dispatch({
        type: EMPTY_CART
    })
}

export const updateItemToCart = (upItem) => {
    return {
        type: UPDATE_ITEM_TO_CART,
        payload: upItem
    }
}

export const setCartData = (cartData) => {
    return {
        type: FETCH_CART_DATA,
        payload: cartData
    }
}

export const fetchCartData = (buyerid) => {
    return async (dispatch) => {
        try {
            const cartInfoData = await fetch('https://maturan.co/v1/api/cart?buyerid=' + buyerid, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => { return response.json() });
            //console.log('\n cartInfoData of CartActions:' + JSON.stringify(cartInfoData));

            //jika, cartnya tidak kosong maka diisi produknya
            if (!cartInfoData.id === null){
                const cartid = cartInfoData[0].id;
                //console.log('\n cartid: ' + cartid);
                const cartItemsData = await fetch('https://maturan.co/v1/api/cartitems?cartid=' + cartid, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    return response.json()
                });
                
                //console.log('\n cartItemsData of CartActions: ' + JSON.stringify(cartItemsData));
                const cartData = [cartInfoData, cartItemsData];
                //console.log('\ncartData of CartActions: ' + JSON.stringify(cartData));
                await dispatch(setCartData(cartData));
                return cartData || [];
            }
        } catch (error) {
            console.error(error);
        }
    };
}
