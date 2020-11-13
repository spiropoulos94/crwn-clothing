import CartActionTypes from '../cart/cart.types';

 const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
    //den xreiazetai payload giati to mono pou theloume einai otan einai tou sygkekrimenou type, na kanei toggle to
    // hidden mesa sto cartReducer. den tou pernaei kapoio payload
})

export default toggleCartHidden;