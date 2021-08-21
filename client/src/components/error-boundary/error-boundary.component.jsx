import React from 'react';

import {ErrorImageOverlay, ErrorImageContainer, ErrorImageText} from './error-boundary.styles.component'
class ErrorBoundary extends React.Component {
    constructor(){
        super();

        this.state = {
            hasErrored: false
        }
    }

// catches any error in any of the children of this error boundry
// this wraps around an a component and any children that encounter an error
// is listened by our error boundary
    static getDerivedStateFromError(error) {

        return { hasErrored: true}

    }
// it gives us access to both the error and the info of the error such as which component 
// broke
    componentDidCatch(error,info) {

        console.log(error, info)

    }

    render() {
        if (this.state.hasErrored) {
// this is the fallback of what gets returned in case there is an error
            return ( 
            <ErrorImageOverlay>
                <ErrorImageContainer imageUrl='https://i.imgur.com/A040Lxr.png'/>
               < ErrorImageText>Sorry this page is broken</ErrorImageText>
             
            </ErrorImageOverlay> )
        } else {

            return this.props.children;

        }

    }
}


export default ErrorBoundary;