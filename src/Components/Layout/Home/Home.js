import React, { Component } from 'react';
import {  Link,  Redirect  } from 'react-router-dom';
import LogCard from './LogCard';
import HistoryCard from './HistoryCard';
import Button from '@material-ui/core/Button';
import Logout from './Logout';
import axios from 'axios';
import Chart from './Chart';
import ChartCard from './ChartCard';
import ShopContext from '../../../context/shop-context';
//import { connect } from 'react-redux';
//import loggedIn from '../../../store/expense/actions';
import './home.css';
import { PDFExport } from '@progress/kendo-react-pdf';


class Home extends Component{

static contextType = ShopContext;

state = {
  redirect: false,
  sessions:[]
}
save = () =>{
  this.table.save();
}
componentDidMount(){
  console.log(this.context);
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

    console.log(this.context);

    if ( this.state.redirect ){

      alert('User logged out already');
      return   <Redirect exact to="/" />

    }

    return(

<div className="card-main">

  <div className="Logout">
    <Logout  />
  </div>





<div className="cards" >
    <div className="card-1">

      <LogCard />

        <Link exact to="/home/log">
          <Button variant="contained" color="primary" >
          Go to Log
          </Button>
        </Link>


    </div>

    <div className="card-2">

      <HistoryCard />
        <Link exact to="/home/history">
          <Button variant="contained" color="primary" >
           Log History
          </Button>
        </Link>

    </div>

    <div className="card-2">

      <ChartCard />
        <Link exact to="/home/chart">
          <Button variant="contained" color="primary" >
           Expense Chart
          </Button>
        </Link>

    </div>

</div>
</div>


    )
  }
}

{/*function mapStateToProps(state,ownProps){
  return{
    state: state
  }
}

const mapDispatchToProps =  (dispatch,ownProps) => {

return{
  loggedIn: dispatch(loggedIn(true))
}
}
*/}

//export default connect(mapStateToProps,mapDispatchToProps) (Home);

export default Home;
