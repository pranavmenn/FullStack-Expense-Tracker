import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const FormDetails = (props) =>{

  return(
    <div>
      <TextField  name="id" label="Expense ID"  onChange = {props.handleChange}/><br /><br />
     <TextField name="date"  type="date" value ={props.state.date} onChange = {props.handleChange} /><br />
     <TextField  name="name" label="Expense Name" value={props.state.name} onChange = {props.handleChange} /><br />
     <TextField  name="amount" label="Amount" value={props.state.amount} onChange = {props.handleChange}   /><br /><br />
     <Button variant="contained" color="primary" onClick={props.handleSubmit}>Save Expense</Button><br /><br />
     <Button variant="contained" color="primary" onClick={props.reset}>Reset</Button><br />
    </div>
  )

}


export default FormDetails;
