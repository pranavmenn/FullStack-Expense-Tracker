import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {  Link  } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Header from './Header'
class Register extends Component{

add = (event) => {
  event.preventDefault();
  this.props.register();

}
  render(){
    return(

      <div>
      <Header />

      <Card >
          <CardContent>
          <Typography variant="h6" color="inherit">
          Not registered?
          </Typography><br />
        <TextField hintText="Enter User Name" label="User Name" onChange={this.props.change("username")} /><br />
        <TextField hintText="Enter Name" label="Password" type="password" onChange={this.props.change("password")} /><br /><br />

        <div className="button">
        <Button variant="contained" color="primary" onClick={this.add}>Sign Up</Button>
        </div><br />
        <br />
        <Typography variant="h6" color="inherit">
        Log in?
        </Typography>
        <Link exact to="/">
        Log in
        </Link>
          </CardContent>
        </Card>


      </div>
    )
  }
}

export default Register;
