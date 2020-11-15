import React from 'react';
import "./header.styles.scss";
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import {createStructuredSelector} from 'reselect';

import {selectCurrentUser} from  '../../redux/user/user.selectors'
import {selectCartHidden} from "../../redux/cart/cart.selectors";


import {ReactComponent as Logo} from "../../assets/crown.svg";
import {auth} from "../../firebase/firebase.utils";

const Header = ({currentUser, hidden}) => {

    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo"/>
            </Link>
            <div className="options">
                <Link className="option" to="/shop">
                    SHOP
                </Link>
                <Link className="option" to="/contact">
                    CONTACT
                </Link>
                {
                    currentUser ?
                        <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                        :
                        <Link className="option" to="/signin">SIGN IN</Link>
                }
                <CartIcon/>
            </div>
            {hidden ? null : <CartDropdown/>}
        </div>
    );
};


//to enhanced component tha exei san props to currentUser ;)
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden : selectCartHidden
    //to current user tha exei value rootReducer => user property => userReducer => state tou userReducer =>
    // state.currentUser
 })

//apo to mapStateToProps tha gyrisei ena object tou opoiou to property name tha perasei san props sto Header

export default connect(mapStateToProps)(Header);


























