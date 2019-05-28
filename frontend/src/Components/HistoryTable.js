import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/EditOutlined';
import Edit from './Edit';
import './history.css';
class HistoryTable extends Component{

state = {
  redirect: false
}
 componentDidMount(){


  /*  const user = localStorage.getItem('username');
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
          })*/

          this.getData();


  }
  state={
    expenses: [],
  }



getData = () =>{
  const user=localStorage.getItem('username');
  axios.get("http://localhost:4000/api/getData/"+user)
  .then(res=>{

    this.setState({expenses: res.data})
  });
}


deleteHandler = (expense,i) => {
console.log(i);
axios.get("http://localhost:4000/api/deleteData/"+expense._id)
        .then(console.log('Deleted'))
        .catch(err => console.log(err))
this.getData();
}



  render(){
    console.log(this.props.state);
    //if ( this.state.redirect ){
      if(this.props.state.status.isLoggedin==false){
        console.log("hello");
      alert('User logged out already');
      return   <Redirect exact to="/" />

    }
    const { expenses } = this.state;
    let name = localStorage.getItem('username');
    return(
      <div className="table">
        <div >
        <Link to="/home"><Button variant="contained" color="primary"> Go Back  </Button></Link>
        </div><br />

      <div className="heading"><h3>Expense History for {name} </h3></div>
      <Table>
        <TableRow>
          <TableCell>Expense ID</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Expense Name</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell />
          <TableCell />
        </TableRow>

        <TableBody>
        {
          expenses && expenses.map((expense,i) => {
            return(
              <TableRow key={i}>
                <TableCell>{expense.sno}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.name}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell> <Link exact to={"/edit/"+expense._id}><EditIcon /></Link></TableCell>

                <TableCell><Button onClick={() => this.deleteHandler(expense,i)}><DeleteIcon /></Button></TableCell>
              </TableRow>

            )
          })
        }
        </TableBody>
        </Table>

        </div>
    )
  }


}
function mapStateToProps(state,ownProps){
  return{
    state: state
  }
}

export default connect(mapStateToProps) (HistoryTable);
