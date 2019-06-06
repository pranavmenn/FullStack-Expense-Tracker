import React from 'react';
import LoadingIndicator from './LoadingIndicator';

const withSpinner = Comp => ({ isLoading, children, ...props}) =>{
 if(isLoading) {
   console.log("loading");
    return <LoadingIndicator  />
  }
  else{
    console.log("else")
    return (
      <Comp {...props}>
      {children}
      </Comp>
    )
  }
};

export default withSpinner;
