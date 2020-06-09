import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, UPDATE_ITEM_TO_CART, FETCH_CART_DATA } from '../actions/types';
import { parse } from 'date-fns';
const initialState = {
    cart: [],
    total: 0,
    itemsQty: 0,
    cartInfo: [],
}


export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.cart && state.cart.length > 0) {
                if (state.cart.every((item, index) => item.id !== action.payload.id)) {
                    return {
                        ...state,
                        cart: [action.payload, ...state.cart],
                        total: state.total + parseInt(action.payload.sellprice) * parseInt(action.payload.qty),
                        itemsQty: state.itemsQty + parseInt(action.payload.qty)
                    }
                } else {
                    
                    const index = state.cart.findIndex(item => item.id == action.payload.id)
                    let itemQty = parseInt(state.cart[index].qty)
                    let sellprice = parseInt(state.cart[index].sellprice)
                    
                    let newCart = state.cart
                    newCart[index].qty = itemQty

                    let itemQtyAft = itemQty + 1
                    action.payload.qty = itemQtyAft
                    let minTotal = state.total - sellprice * itemQty
                    let newTotal = minTotal + (sellprice * itemQtyAft)

                    return {
                        ...state,
                        cart: [...newCart],
                        total: newTotal,
                        itemsQty: state.itemsQty + 1
                    }
                    // let index = state.cart.findIndex(item => item.id == action.payload.id)

                    // let sellprice = parseInt(state.cart[index].sellprice)

                    // let itemQtyBef = parseInt(state.cart[index].qty)

                    // let itemQtyAft = itemQtyBef + 1

                    // action.payload.qty = itemQtyAft

                    // let totalQty = state.itemsQty + 1

                    // let minTotal = state.total - sellprice * itemQtyBef

                    // let newTotal = minTotal + (sellprice * itemQtyAft)

                    // let minCart = state.cart.filter((item) => item.id !== action.payload.id)

                    // return {
                    //     ...state,
                    //     cart: [action.payload, ...minCart],
                    //     total: newTotal,
                    //     itemsQty: totalQty
                    // }
                }
            } else {
                console.log('\n action.payload first: ' + action.payload.qty)
                return {
                    ...state,
                    cart: [action.payload, ...state.cart],
                    total: state.total + parseInt(action.payload.sellprice) * parseInt(action.payload.qty),
                    itemsQty: state.itemsQty + parseInt(action.payload.qty)
                }
            }

        case UPDATE_ITEM_TO_CART:

            const idx = state.cart.findIndex(item => item.id == action.payload.id)
            let updatedCart = state.cart
            console.log ('\nupdatedcart before: ' + JSON.stringify(updatedCart))
            updatedCart[idx] = action.payload;
            console.log ('\nupdatedcart after: ' + JSON.stringify(updatedCart))

            return {
                ...state,
                cart: updatedCart,
                total: parseInt(state.total) + parseInt(action.payload.sellprice),
                itemsQty: parseInt(state.itemsQty) + 1
            }

        case FETCH_CART_DATA:
            return {
                ...state,
                cartInfo: action.payload[0],
                cart: action.payload[1],
                total: action.payload[0][0].totalprice,
                itemsQty: action.payload[0][0].totalqty
            }

        case EMPTY_CART:
            return {
                ...state,
                cart: [],
                total: 0,
                items: 0
            }
        case REMOVE_FROM_CART:
            const index = state.cart.findIndex(item => item.id == action.payload.id)
            let itemQty = parseInt(state.cart[index].qty) - 1
            let newCart = state.cart
            newCart[index].qty = itemQty

            if (itemQty <= 0) {
                newCart = newCart.filter((item) => item.id !== action.payload.id)
            }

            return {
                ...state,
                cart: [...newCart],
                total: state.total - action.payload.sellprice,
                itemsQty: state.itemsQty - 1
            }
        default:
            return state
    }
}