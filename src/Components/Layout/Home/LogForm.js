import React, { Component,Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
//import { connect } from 'react-redux';
import './LogForm.css';
import moment from 'moment';
import Header from './Header';
import ShopContext from '../../../context/shop-context';


class LogForm extends Component{
  static contextType = ShopContext;

  /*  componentDidMount(){

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

      if(!this.props.isLoggedin){
        this.setState({
          redirect: true
        })
      }\

      console.log(this.props.isLoggedin);
          if(this.props.isLoggedin==false){

          this.setState({
            redirect: true
          })

        }

  }*/

state = {

  name: '',
  amount: '',
  redirect: false,
  loading: true,
  message:"",

}

handleChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
}

reset = () =>{
  this.setState({
    id:'',
    date:'',
    name: '',
    amount:'',
    message:''
  })
}
handleSubmit = (event) => {
  event.preventDefault();
  console.log(this.name);

  const user=localStorage.getItem('username');
  const {id, name,amount} = this.state;
  if((id!=null)||(name!=null)||(amount!=null)){
    const formatted_date=moment(this.state.date).format("YYYY-MM-DD");
    console.log(formatted_date);
    axios.post('http://localhost:4000/api/putDataToDB/'+user, {
      sno: id,
      date: formatted_date,
      name: name,
      amount: amount
    })
    .then((response)=>{
      console.log(response);
      this.setState({loading: false,message:"Saved successfully"});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  else{
    alert("Empty fields");
  }
}

  render(){

    console.log(this.props.isLoggedin);
    //if(this.props.state.status.isLoggedin==false)
    if(!this.context.isLoggedin){
      console.log("hello");
    alert('User logged out already');
    return   <Redirect exact to="/" />

  }


    return(

          <Fragment>
            <Header />
            <div >
            <Link to="/home"><Button variant="contained" color="primary"> Go Back  </Button></Link>
            </div>
                <div className="card">

                          <h3>Expense Details</h3>


                         <TextField  name="id" label="Expense ID" value={this.state.id} onChange = {this.handleChange}/><br />
                          <TextField name="date"  type="date" value ={this.state.date} onChange = {this.handleChange} /><br />
                          <TextField  name="name" label="Expense Name" ref={(input) => {this.name=input}} value={this.state.name} onChange = {this.handleChange} /><br />
                          <TextField  name="amount" label="Amount" value={this.state.amount} onChange = {this.handleChange}   /><br /><br />
                          <Button variant="contained" color="primary" onClick={this.handleSubmit}>Save Expense</Button><br /><br />
                          <p>{this.state.message}</p>
                          <Button variant="contained" color="primary" onClick={this.reset}>Reset</Button><br />


                </div>

            </Fragment>
     )
  }
}

{/*function mapStateToProps(state,ownProps){
  return{
    state: state
  }
}
*/}
//export default connect(mapStateToProps) (LogForm);
export default LogForm;
