import React from 'react';
import {SpinnerContainer, SpinnerOverlay} from "./with-spinner.styles";

// To WithSpinner einai mia function pou pairnei ena WrappedComponent kai gyrnaei ena kainourio Component.
//Sthn dikia mas periptwsh to neo component exei ena isLoading prop kai vasei aytou kanei render eite to spinner
// eite to wrapped component pou exei parei.

const WithSpinner = (WrappedComponent) => ({isLoading, ...otherProps}) => {  //pairnei to wrapComponent kai gyrnaei ena neo me props apo to wrapped
    return isLoading ? (                                                     //isLoading + ...otherProps erxontai apo to wrappedComponent
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
    ) : <WrappedComponent {...otherProps} />
}

export default WithSpinner;