import React,{ Component } from 'react';
import { Spinner } from 'react-activity';
import CircularProgress from '@material-ui/core/CircularProgress';
import './loader.css';

const LoadingIndicator = () =>{
  return(
    <div className="loader">
    <h1>Loading ...</h1>
    <CircularProgress />
    </div>
  )
}


export default LoadingIndicator;
