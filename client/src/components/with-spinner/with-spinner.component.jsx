import React from "react";

import Spinner from '../spinner/spinner.component';

// a higher order component returns another functional component

const WithSpinner = WrappedComponent => ({isLoading , ...otherProps}) => {
        
        return isLoading ? <Spinner/> :  <WrappedComponent {...otherProps}/>  
            // this way we pass through the props to the component we wrap
         
       
    };
    
export default WithSpinner;