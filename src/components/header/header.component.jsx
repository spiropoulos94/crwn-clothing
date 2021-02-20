import React from 'react';
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from  '../../redux/user/user.selectors'
import {selectCartHidden} from "../../redux/cart/cart.selectors";


import {ReactComponent as Logo} from "../../assets/crown.svg";
import {auth} from "../../firebase/firebase.utils";

import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv} from "./header.styles";


const Header = ({currentUser, hidden}) => {

    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo"/>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to="/shop">
                    SHOP
                </OptionLink>
                <OptionLink to="/contact">
                    CONTACT
                </OptionLink>
                {
                    currentUser ?
                        <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv >
                        :
                        <OptionLink to="/signin">SIGN IN</OptionLink>
                }
                <CartIcon/>
            </OptionsContainer>
            {hidden ? null : <CartDropdown/>}
        </HeaderContainer>
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


























