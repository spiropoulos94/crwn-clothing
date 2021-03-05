import React from 'react';
import { Route }  from "react-router-dom";

import {createStructuredSelector} from "reselect";

import "./shop.styles.scss";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import { connect } from 'react-redux';

import {fetchCollectionsStartAsync  } from "../../redux/shop/shop.actions"
import {selectIsCollectionsFetching } from "../../redux/shop/shop.selector";


import WithSpinner from "../../components/withSpinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


//prokeimenou na deiksume to route pou eimaste twra xisimopoioume to match.path. esi wste se ayto to route na deixeni to synoliko overview

class ShopPage extends React.Component {


    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;

        fetchCollectionsStartAsync();

        // const collectionRef = firestore.collection("collections");
        //
        // collectionRef.get().then(snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        //     updateCollections(collectionsMap)
        //     this.setState({loading:false})
        // })
    }

    render() {
        const { match, isCollectionFetching } = this.props;
         return (
            <div className="shop-page">
                <Route exact path={`${match.path}`}
                       render={(props)=><CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props } />}  />
                <Route path={`${match.path}/:collectionId`}
                       render={(props)=> <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props } /> } />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionsFetching
})

 const mapDispatchToProps = dispatch => ({
     fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
 })


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopPage);