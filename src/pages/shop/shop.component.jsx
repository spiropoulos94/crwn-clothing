import React from 'react';
import { Route }  from "react-router-dom";

import "./shop.styles.scss";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import connect from "react-redux/lib/connect/connect";

import {updateCollections} from "../../redux/shop/shop.actions"

import {firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

//prokeimenou na deiksume to route pou eimaste twra xisimopoioume to match.path. esi wste se ayto to route na deixeni to synoliko overview

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props
        const collectionRef = firestore.collection("collections");
        collectionRef.onSnapshot(async snapshot => {
            // console.log("snapshot", {snapshot})
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            // console.log({collectionsMap})
            updateCollections(collectionsMap)
        })

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

 const mapDispatchToProps = dispatch => ({
     updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
 })


export default connect(null, mapDispatchToProps)(ShopPage);