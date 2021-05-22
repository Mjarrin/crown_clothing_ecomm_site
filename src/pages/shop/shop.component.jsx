import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container"
import CollectionsPageContainer from "../collection/collection.container";
import { connect } from "react-redux";

// name of our saga
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";



class ShopPage extends React.Component {

   state = {
      loading : true
   }

   unsubscribeFromSnapshot = null;


   componentDidMount() {

      const { fetchCollectionsStart } = this.props;

      fetchCollectionsStart()

   }

   render() {
      const { match } = this.props;
   
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
}


const mapDispatchToProps = dispatch => ({
   // whenever this method fires our saga is triggered consequently
   fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
   
})


export default connect(null,mapDispatchToProps)(ShopPage);