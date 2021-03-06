import {createSelector} from "reselect";

//Input selector : doesn't use createSelector
const selectCart = state => state.cart

//Output selector : uses createSelector & input selectors

export const selectCartItems = createSelector(   //because we used createSelector, then our selector is memoized
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)


export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems && cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price, 0)
)