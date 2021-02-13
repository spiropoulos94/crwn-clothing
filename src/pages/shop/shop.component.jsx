import React from 'react';
import { Route }  from "react-router-dom";

import "./shop.styles.scss";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

//prokeimenou na deiksume to route pou eimaste twra xisimopoioume to match.path. esi wste se ayto to route na deixeni to synoliko overview

const ShopPage = ({match}) => {
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        );
}


export default ShopPage;