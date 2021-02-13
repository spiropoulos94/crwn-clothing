import React from 'react';
import "./collection.styles.scss";
import { connect } from "react-redux"
import CollectionItem from "../../components/collection-item/collection-item.component";

import {selectCollection} from "../../redux/shop/shop.selector";

const CollectionPage = (props) => {
    console.log(props)
    return (
        <div className="collection-page">
            <h2>Collection Page</h2>
        </div>
    );
};


const mapStateToProps = (state, ownProps) => ({
    // edw mesa vazoume to state, dioti to selectCollection() kanei return to CreateSelector to opoio to xreiazetai mesa tou
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);