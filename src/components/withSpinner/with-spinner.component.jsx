import React from 'react';
import {SpinnerContainer, SpinnerOverlay} from "./with-spinner.styles";

const WithSpinner = (WrappedComponent) => ({isLoading, ...otherProps}) => {  //pairnei to wrapComponent kai gyrnaei ena neo me props apo to wrapped
    return isLoading ? (                                                     //isLoading + ...otherProps erxontai apo to wrappedComponent
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
    ) : <WrappedComponent {...otherProps} />
}

export default WithSpinner;