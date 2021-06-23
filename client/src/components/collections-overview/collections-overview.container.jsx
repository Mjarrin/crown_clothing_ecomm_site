// a component that gets wrapped in all the higher order components that it need
// in order to properly run the same way it expects itself 
// two levels of wrapping to have our shop page not handle the spinner functionality within it

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

// in this way our component will have the withspinner functionality 
// as well as being able to determine if our collections loaded by being connected in redux
// compose let us call all our functions as you can see in the bottom
// In an easier to read format, and its more scalabe in case we add more HOCs
// compose evaluates from right to left, so it will start with WithSpinner
const CollectionsOverviewContainer = compose(
connect(mapStateToProps),
WithSpinner

)(CollectionsOverview);

//connect(mapStateToProps)(WithSpinner(collectionsOverview))

export default CollectionsOverviewContainer;
