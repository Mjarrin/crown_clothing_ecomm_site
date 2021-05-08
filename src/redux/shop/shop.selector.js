import memoize from "lodash.memoize";

import { createSelector }  from "reselect";


const shopSelector = state => state.shop;

export const selectCollections = createSelector(
    [shopSelector],
        shop => shop.collections 
)


export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
  );
  



//  If this function gets called again with the 
// same collectionUrlParam, don't rerun this function 
// because we'll return the same value as last time, which we've memoized so just return the selector that's been stored.

export const selectCollection = collectionUrlParam => 
 createSelector(
    [selectCollections],
    collections => collections ? collections[collectionUrlParam] : null
    );


