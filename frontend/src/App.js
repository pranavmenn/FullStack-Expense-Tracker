import React, { Component } from 'react';
import './App.css';
import Layout from './Components/Layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class App extends Component{

  render(){
    return(
      <div>
        <Layout />
      </div>
    )
  }
}
export default App;
