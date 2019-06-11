import React, { Fragment } from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';


const App = () => {
  return(
    <ErrorBoundary render={()=><p>Something went wrong!</p>}>
    <Fragment>

        <Layout />
    </Fragment>
  </ErrorBoundary>


  )
}

export default App;
