import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {  Link  } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Header from '../Home/Header'
import HeaderRegister from '../Home/HeaderRegister';
import './register.css';
class RegBackend extends Component{

  state = {
    username: "",
    password: ""
  }

  message = ''
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

add = () =>{
  const {username, password} = this.state;
  axios.post('http://localhost:4000/api/register', {
    username: username,
    password: password
  })
  .then(res=>{
    this.message=res.data.message;
    alert(this.message);
    })
  .catch((error) => {
    console.log(error);
  });
}
  render(){
    return(

      <div>
      <HeaderRegister />

      <Card >
          <div className="CardContent">

            <CardContent>
            <Typography variant="h6" color="inherit">
            Not registered?
            </Typography><br />
          <TextField name="username" hintText="Enter User Name" label="User Name" onChange={this.handleChange} /><br />
          <TextField name="password" hintText="Enter Name" label="Password" type="password" onChange={this.handleChange} /><br /><br />

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

          </div>

        </Card>


      </div>
    )
  }
}

export default RegBackend;
