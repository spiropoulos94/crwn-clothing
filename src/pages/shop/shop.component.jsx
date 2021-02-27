import React from 'react';
import { Route }  from "react-router-dom";

import "./shop.styles.scss";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import {firestore} from "../../firebase/firebase.utils";

//prokeimenou na deiksume to route pou eimaste twra xisimopoioume to match.path. esi wste se ayto to route na deixeni to synoliko overview

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection("collections");
        collectionRef.onSnapshot()

        //todo apo edw suunexise
    }

    render() {
        const { match } = this.props;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        );
    }
}



export default ShopPage;