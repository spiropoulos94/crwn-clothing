import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51IMgX9LCEjsbtGypu8DuiK6Dqvygmd3FjQXFsvrdt2RW0mXpvsib18gf7xPuHxOyfNNeFizRcFC3PBL3oClxlvrM00CWpcFuP5"

    const onToken = token => {
        console.log(token)
        alert("Payment Succesfull")
    }
    return (
            <StripeCheckout
                label="Pay Now"
                name="Crwn Clothing Ltd"
                billingAddress
                shippingAddress
                image="https://svgshare.com/i/CUz.svg"
                description={`Your total is $${price}`}
                amount={priceForStripe}
                panelLabel="Pay now"
                token={onToken}
                stripeKey={publishableKey}
            />
    );
};

export default StripeCheckoutButton;