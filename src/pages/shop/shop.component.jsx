import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container"
import CollectionsPageContainer from "../collection/collection.container";
import { connect } from "react-redux";

// name of our saga
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { addFetchListener } from "workbox-precaching/utils/addFetchListener";



const ShopPage = ({ fetchCollectionsStart, match }) => {

   useEffect(() => {

      fetchCollectionsStart()

      // by listening to fetch collection start first we make sure we only fetch
      // our collection once even if the our parent such as a current user is identified
      // which will cause a sign in event automatically re rendering the app
      // listen to a specific dependency only
   },[fetchCollectionsStart]) 

      return (

         <div className="shop-page">
            <Switch>
               <Route exact path={`${match.path}`} 
               component={CollectionsOverviewContainer}/>
               <Route path={`${match.path}/:collectionId`}
                component={CollectionsPageContainer}
                />

            </Switch>

         </div>
      )
   
}


const mapDispatchToProps = dispatch => ({
   // whenever this method fires our saga is triggered consequently
   fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
   
})


export default connect(null,mapDispatchToProps)(ShopPage);