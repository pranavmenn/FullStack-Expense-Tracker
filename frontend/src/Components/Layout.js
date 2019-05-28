import React, { Component } from 'react';
import { BrowserRouter, Redirect, withRouter  } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Header from './Header';
import Home from './Home';
import './layout.css';
import LogForm from './LogForm';
import HistoryTable from './HistoryTable';
import Edit from './Edit';
import RegBackend from './RegBackend';
import LoginBackend from './LoginBackend';
class Layout extends Component{


  state={
      users:[{"username":'',"password":''}],
      isLoggedin: false

      }


  user={
    username:"",
    password:""
  };

handleChange = (input) => (event)=>{
    this.user[input]=event.target.value;
    console.log(this.user[input], event.target.value);
}

  register = () =>{

    var updatedUsers=this.state.users.concat({"user":this.user.username,"pass":this.user.password});
    this.setState({
      users: updatedUsers,
    })

    console.log(this.state.users);
  }




render(){


    return(

      <div className="page">
        <Header />
      <div className="components">
      <BrowserRouter>

      <Route exact path="/" component={()=>
          <div className="home">
            <LoginBackend   />
          </div>

      } />
      <Route exact path="/register" render={()=>
    //  <Register change={this.handleChange} register={this.register} username={this.state.username} password={this.state.password} unArray={this.state.unArray} pwArray={this.state.pwArray} text={this.updateState} />
      <RegBackend />
    } />
  <Route path="/home" exact strict component={() =>
        <div>
          <Home  />
        </div>
      } />

    <Route path="/home/log" exact strict component={LogForm} />
    <Route path="/home/history" component={HistoryTable} />
    <Route path="/edit/:id" exact component={Edit} />

      </BrowserRouter>


      </div>
      </div>


    )
  }
}

export default withRouter(Layout);
