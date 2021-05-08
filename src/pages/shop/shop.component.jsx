import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component"
import CollectionsPage from "../collection/collection.component";
import { connect } from "react-redux";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);


class ShopPage extends React.Component {

   state = {
      loading : true
   }

   unsubscribeFromSnapshot = null;


   componentDidMount() {
      const collectionRef = firestore.collection("collections");
      const { updateCollections } = this.props; 

      // update listener on snapshot/renders (observable)
      collectionRef.onSnapshot(async snapshot => {
      // instead of having the observable we can also do a promised based
      // system using.get().then the only difference is that the api call is only
      // called on component did mount is not constantly listening as with the observer 

        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

        if (collectionsMap) {
          updateCollections(collectionsMap)
          this.setState({loading : false});
        }  
      });
   }

   render() {
      const { match } = this.props;
      const { loading } = this.state;
      return (

         <div className="shop-page">
            <Switch>
               <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>}/>
               <Route path={`${match.path}/:collectionId`}
                render={(props) => <collectionPageWithSpinner isLoading={loading} {...props}/>}
                />

            </Switch>

         </div>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null,mapDispatchToProps)(ShopPage);