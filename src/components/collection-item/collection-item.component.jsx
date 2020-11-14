import React from "react";
import "./collection-item.styles.scss";

import {connect} from "react-redux";

import CustomButton from "../custom-button/custom-button.component";

import {addItem} from "../../redux/cart/cart.actions";

const CollectionItem = ({item, addItem}) => {

    const {name, price, imageUrl} = item

    return (
        <div className="collection-item">
            <div className="image" style={{backgroundImage : `url(${imageUrl})` }}/>
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <CustomButton onClick={()=> addItem(item)} inverted >Add to Cart</CustomButton>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addItem: item => (dispatch(addItem(item)))
})

//h parapanw arrow function tha mporouse na graftei kai ws ekshs:

// const mapDispatchToProps = dispatch => ({
//     addItem: function fnName (item) {
//         dispatch(addItem(item))
//     }
// })

//to addItem einai ayto => {{{ item => dispatch(addItem(item)) }}} me alla logia einai arrow function kai method tou
// object

//h addItem property anaparista mia function sthn opoia tha perastei to item kai meta tha ginei dispatched
//ayth receives as property to item , kai to passarei mesa sto addItem action creator to oppoio mas dinei ena type
// kai ena payload

export default connect(null,mapDispatchToProps)(CollectionItem);