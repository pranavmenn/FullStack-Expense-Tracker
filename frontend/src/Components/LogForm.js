import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './LogForm.css';
class LogForm extends Component{

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
  redirect: false
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
  })
}
handleSubmit = (event) => {
  event.preventDefault();
  const user=localStorage.getItem('username');
  const {id, date, name,amount} = this.state;
  axios.post('http://localhost:4000/api/putDataToDB/'+user, {
    sno: id,
    date: date,
    name: name,
    amount: amount
  })
  .then((response)=>{
    console.log(response);
    alert(response.data.message)
  })
  .catch((error) => {
    console.log(error);
  });
}

  render(){
    console.log(this.props.isLoggedin);
    if(this.props.state.status.isLoggedin==false){
      console.log("hello");
    alert('User logged out already');
    return   <Redirect exact to="/" />

  }
    return(
          <div>
            <div >
            <Link to="/home"><Button variant="contained" color="primary"> Go Back  </Button></Link>
            </div>
                <div className="card">

                          <h3>Expense Details</h3>


                         <TextField  name="id" label="Expense ID" value={this.state.id} onChange = {this.handleChange}/><br />
                          <TextField name="date"  type="Date" value ={this.state.date} onChange = {this.handleChange} /><br />
                          <TextField  name="name" label="Expense Name" value={this.state.name} onChange = {this.handleChange} /><br />
                          <TextField  name="amount" label="Amount" value={this.state.amount} onChange = {this.handleChange}   /><br /><br />
                          <Button variant="contained" color="primary" onClick={this.handleSubmit}>Save Expense</Button><br /><br />
                          <Button variant="contained" color="primary" onClick={this.reset}>Reset</Button><br />


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

export default connect(mapStateToProps) (LogForm);
