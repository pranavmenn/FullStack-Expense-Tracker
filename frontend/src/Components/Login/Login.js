import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import './login.css';
import Header from './Header'
import Home from './Home';

const Login = () =>{
  return(


    <div className="card">

      <Card >
          <CardContent>
          <Typography variant="h6" color="inherit">
          Login
          </Typography><br />
        <TextField hintText="Enter User Name" label="User Name" name="username" onChange={this.props.change("username")} /><br />
        <TextField hintText="Enter Name" label="Password" type="password" name="password"  /><br /><br />

        <div className="button">
        <Link exact to="/home">
          <Button variant="contained" color="primary" >Login</Button>
        </Link>
        </div><br />
        <br />
        <Typography variant="h6" color="inherit">
        Not Registered?
        </Typography>
        <Link exact to="/register">
        Register
        </Link>
          </CardContent>
        </Card>




    </div>

  )

}

export default Login;
