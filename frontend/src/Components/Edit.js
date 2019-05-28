import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/EditOutlined';

class Edit extends Component{

  state = {
    name: '',
    amount: ''
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  edit = (event) =>{

    event.preventDefault();

    const obj = {
      name: this.state.name,
      amount: this.state.amount
    }

    axios.post("http://localhost:4000/api/edit/"+this.props.match.params.id,obj)
    .then(res => console.log(res.data));

  }

  render(){
    return(
      <div>
      <h1>Edit Expense</h1>
      
      <TextField hintText="Expense Name" name="name" label="Expense Name" onChange = {this.handleChange} /><br />
      <TextField hintText="Enter Amount" name="amount" label="Amount"  onChange = {this.handleChange}   /><br /><br />
      <Button variant="contained" color="primary" onClick={this.edit}>Submit</Button><br />
      <Link exact to="/home/history">
        <Button variant="contained" color="primary" >
        Go to Log History
        </Button>
      </Link>
      </div>
    )
  }
}
 export default Edit;
