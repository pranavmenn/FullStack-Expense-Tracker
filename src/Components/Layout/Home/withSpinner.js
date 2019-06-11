import React from 'react';
import LoadingIndicator from './LoadingIndicator';

const withSpinner = Comp => ({ isLoading, children, ...props}) =>{
 if(isLoading) {
    return <LoadingIndicator  />
  }
  else{
    return (
      <Comp {...props}>
      {children}
      </Comp>
    )
  }
};

export default withSpinner;
