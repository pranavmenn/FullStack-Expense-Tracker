import React, { Component,Fragment } from 'react';
import { BrowserRouter,withRouter  } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Header from './Home/Header';
import Home from './Home/Home';
import './layout.css';
import LogForm from './Home/LogForm';
import HistoryTable from './Home/HistoryTable';
import Edit from './Home/Edit';
import RegBackend from './Register/RegBackend';
import LoginBackend from './Login/LoginBackend';
import ShopContext from '../../context/shop-context';
import Chart from './Home/Chart';

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

  state = {
    isLoggedin:false
  }

  loggedIn = (status) =>{this.setState({isLoggedin: status})};

render(){


    return(
    <ShopContext.Provider value={{isLoggedin: this.state.isLoggedin,loggedIn: this.loggedIn}}>

    <Fragment>
    {/* {null.map(val => val)} */}
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
    <Route path="/home/chart" exact component={Chart} />

    </BrowserRouter>


    </div>

    </Fragment>





    </ShopContext.Provider>


    )
  }
}

export default withRouter(Layout);
