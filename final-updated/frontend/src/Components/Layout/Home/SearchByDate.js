import React, {Component} from 'react';
import moment from 'moment';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/EditOutlined';



class SearchByDate extends Component{

  getData = () =>{
    const user=localStorage.getItem('username');
    axios.get("http://localhost:4000/api/getData/"+user)
    .then(res=>{

      this.setState({expenses: res.data})
    });
    console.log("Got data");

  }


  state = {
      expenses: []
  }

  componentDidMount(){
  /*  const user=localStorage.getItem('username');
    const formatted_date=moment(this.props.date).format("YYYY-MM-DD");
    axios.get("http://localhost:4000/api/getByDate/"+user+"/"+formatted_date)
    .then(res =>{
      this.setState({expenses: res.data})
    });*/

    this.getData();
  }

  render(){
    const { expenses } = this.state;
    let name = localStorage.getItem('username');
    const formatted_date=moment(this.props.date).format("YYYY-MM-DD");
    console.log(expenses);
    console.log(formatted_date);
    return(

      <div className="table">
      <div >
      <Link to="/home"><Button variant="contained" color="primary"> Go Back  </Button></Link>
      </div><br />



        <div >
        </div><br />

      <div className="heading"><h3>Expense History for {name} </h3></div>
      <Table>

      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Expense Name</TableCell>
        <TableCell>Amount Spent</TableCell>
        <TableCell>Edit Expense</TableCell>
        <TableCell>Delete Expense</TableCell>
        <TableCell />
      </TableRow>


        <TableBody>
        {
          expenses && expenses.map((expense,i) => {
            console.log(expense.date);

            if(moment(expense.date).format("YYYY-MM-DD")==formatted_date){
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
            }


          })
        }
      </TableBody>


        </Table>

        <br /><br />
        <div className="search">
        </div>

        </div>
    )
  }

}

export default SearchByDate;
