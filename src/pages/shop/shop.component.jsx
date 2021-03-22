import React from "react";
import { Route , Switch, useRouteMatch } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component"
import CollectionsPage from "../collection/collection.component";



const ShopPage = () => {

   let match = useRouteMatch();

      return (

            <div className="shop-page">
            <Switch>
               <Route exact path={`${match.path}`} component={CollectionsOverview} />
               <Route path={`${match.path}/:collectionId`} component={CollectionsPage} />

            </Switch>
           
            </div>
      )
   }



export default ShopPage; 