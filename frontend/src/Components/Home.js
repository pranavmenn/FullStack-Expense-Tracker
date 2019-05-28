import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Redirect  } from 'react-router-dom';
import LogCard from './LogCard';
import HistoryCard from './HistoryCard';

import Button from '@material-ui/core/Button';
import Logout from './Logout';
import axios from 'axios';
import * as actions from '../store/expense/actions';
import { connect } from 'react-redux';
import loggedIn from '../store/expense/actions';
import './home.css';

class Home extends Component{

state = {
  redirect: false,
  sessions:[]
}
componentDidMount(){
 const user = localStorage.getItem('username');
  console.log(user);

  axios.get('http://localhost:4000/api/checkSession/'+user)
        .then(res => {
          console.log(res.data.success);
          console.log(res.data.message);
          if(!res.data.success)
          {
            this.setState({
              redirect:true,
            })
          }
        })




}





  render(){


    if ( this.state.redirect ){

      alert('User logged out already');
      return   <Redirect exact to="/" />

    }
    return(
<div>

  <div className="Logout">
    <Logout  />
  </div>
<div>
      <LogCard />
    <Link exact to="/home/log">
      <Button variant="contained" color="primary" >
      Go to Log
      </Button>
    </Link>
    <br /><br />
  <HistoryCard />
    <Link exact to="/home/history">
      <Button variant="contained" color="primary" >
      Go to Log History
      </Button>
    </Link>
</div>
</div>


    )
  }
}

function mapStateToProps(state,ownProps){
  return{
    state: state
  }
}

const mapDispatchToProps =  (dispatch,ownProps) => {

return{
  loggedIn: dispatch(loggedIn(true))
}
}

export default connect(mapStateToProps,mapDispatchToProps) (Home);
