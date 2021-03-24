import React from "react";
import StripeCheckout from "react-stripe-checkout";

import "./stripe-button.styles.scss";

// we pass the component resposible for providing the context to our application
// Persist Gate the persistor which is the persisted version of our store
// 42  exp 01 / 20  CW 123 stipe test credit card
const StripeCheckoutButton = ({ price }) => {
    // stripe only takes values in cents
    // therefore we need to convert this
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51IXyPuFMpAO28oaA9500M3pZM2Vh4elN4W31YBRYQo3lIhdsVHjUz0lp0o5nnBCERCFlanM1SxCvVfKB5sd47Mig00bP4Vbo6q"

    // on success call back that gets handled by the stripe component when
    // we submit
    const onToken = token => {
        console.log(token);

        alert("Payment Succesful")
    }
    return (

        <StripeCheckout
        label="Pay Now"
        name="CRWN Clothing LTD."
        billingAddress
        shippingAddress
        image="https://sendeyo.com/en/f3eb2117da"
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
        
        />

    )

    
}

export default StripeCheckoutButton;