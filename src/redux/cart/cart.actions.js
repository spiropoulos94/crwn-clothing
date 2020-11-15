import CartActionTypes from '../cart/cart.types';

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
    //den xreiazetai payload giati to mono pou theloume einai otan einai tou sygkekrimenou type, na kanei toggle to
    // hidden mesa sto cartReducer. den tou pernaei kapoio payload
})


//addItem action creator. It takes an item and returns an action which has the given item as payload.
export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})

export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
})

export const clearItemFromCart = item => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
})

