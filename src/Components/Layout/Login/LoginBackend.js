import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import './login.css';
import axios from 'axios';
import * as actions from '../../../store/expense/actions';
import { connect } from 'react-redux';
import loggedIn from '../../../store/expense/actions';
import withSpinner from '../Home/withSpinner';
import Home from '../Home/Home';
import ShopContext from '../../../context/shop-context';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';

class LoginBackend extends Component{

  static contextType = ShopContext;


  state = {
    users:[],
    username:'',
    password:'',
    loginStatus: 0
  }

  message='';
  success=false;


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }




  login = () =>{

    const {username, password} = this.state;
    axios.post('http://localhost:4000/api/login', {
      username: username,
      password: password
    })

    .then(res =>{
      if(res.data.success){
        localStorage.setItem('username',this.state.username);
        this.storeToken();
        localStorage.setItem('JWT',res.data.token);

      }
      else if(!res.data.success){
        alert("Invalid login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
/*
  verify = (token) => {
    const {username,password} = this.state;
    axios.post('http://localhost:4000/api/userSession', {
      userId: token,
      username: username
    })

  }
*/

storeToken = () => {

  axios.post('http://localhost:4000/api/userSession',{
    username: this.state.username
  })
  .then(res => {
    this.setState({
      loginStatus: 1,
    })
    //this.mapDispatchToProps();

    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
}

  render(){

    if(this.state.loginStatus==1){
      this.context.loggedIn(true);
      return <Redirect exact to="/home" />


    }



    return(


          <div className="home">
            <div className="card">
              <Avatar>
                <LockOutlinedIcon />
            </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

                  <div className="CardContent">


                  <TextField  label="User Name" name="username" onChange={this.handleChange} /><br />
                  <TextField  label="Password" type="password" name="password" onChange={this.handleChange}  /><br /><br />

                  <div className="button">

                    <Button variant="contained" color="primary" onClick={this.login}>Login</Button>

                  </div><br />
                  <br />
                  <Typography variant="h6" color="inherit">
                  Not Registered?
                  </Typography>
                  <Link exact to="/register">
                  Register
                  </Link>

                  </div>
            </div>

</div>

    )
  }
}

{/*}
function mapStateToProps(state,ownProps){
  return{
    isloggedin: state.isLoggedin
  }
}


const mapDispatchToProps =  (dispatch,ownProps) => {

return{
  loggedIn: dispatch(loggedIn(false))
}
}
*/}
//export default connect(mapStateToProps,mapDispatchToProps) (LoginBackend);

export default LoginBackend;
