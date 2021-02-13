import React, {Component} from 'react';
import "./shop.styles.scss";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

const ShopPage = ({collections}) => {

        return (
            <div className="shop-page">
                <CollectionsOverview/>
            </div>
        );
}


export default ShopPage;