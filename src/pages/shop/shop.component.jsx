import React from 'react';
import { Route }  from "react-router-dom";

import "./shop.styles.scss";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import { connect } from 'react-redux';

import {updateCollections} from "../../redux/shop/shop.actions"

import {firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

import WithSpinner from "../../components/withSpinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


//prokeimenou na deiksume to route pou eimaste twra xisimopoioume to match.path. esi wste se ayto to route na deixeni to synoliko overview

class ShopPage extends React.Component {

    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props
        const collectionRef = firestore.collection("collections");
        collectionRef.onSnapshot(async snapshot => {
            // console.log("snapshot", {snapshot})
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            // console.log({collectionsMap})
            updateCollections(collectionsMap)
            this.setState({loading:false})
        })

    }

    render() {
        const { match } = this.props;
        const {loading} = this.state;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`}
                       render={(props)=><CollectionsOverviewWithSpinner isLoading={loading} {...props } />}  />
                <Route path={`${match.path}/:collectionId`}
                       render={(props)=> <CollectionPageWithSpinner isLoading={loading} {...props } /> } />
            </div>
        );
    }
}

 const mapDispatchToProps = dispatch => ({
     updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
 })


export default connect(
    null,
    mapDispatchToProps
)(ShopPage);