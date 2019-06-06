import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { BrowserRouter, Link, Switch, Redirect  } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import axios from 'axios';
import ShopContext from '../../../context/shop-context';

class Logout extends Component{

  static contextType = ShopContext;

  state = {
    redirect: false
  }
  logout = () =>{
    const user = localStorage.getItem('username');
    console.log(user);
    axios.get('http://localhost:4000/api/logout/'+user)
        .then(res=>{
          if(res.data.success){
            localStorage.removeItem('username');
            this.context.loggedIn(false);
            this.setState({
              redirect: true
            })
          }

        })


  }
  render(){

    if(!this.context.isLoggedin){
      return <Redirect exact to="/" />
    }
    return(
      <Button variant="contained" color="secondary" onClick={this.logout}>Logout</Button>

    )
  }
}

export default Logout;
