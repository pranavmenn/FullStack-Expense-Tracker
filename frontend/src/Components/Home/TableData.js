import React,{Component,Fragment} from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/EditOutlined';
import Edit from './Edit';
import './history.css';
import moment from 'moment';
import { PDFExport } from '@progress/kendo-react-pdf';
import LoadingIndicator from './LoadingIndicator.js';
import TablePDF from './TablePDF';
import PropTypes from 'prop-types';

class TableData extends Component{

  state={
    pdf: false
  }
  exportPDF = () => {
    this.setState({
      pdf:true
    })
  }
  render(){
    if(this.state.pdf){
      console.log(this.state.pdf);
      return <TablePDF expenses={this.props.expenses} />
    }
    return(
      <Fragment>

          <Table>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell onClick={() => this.props.sort('date')}>Date</TableCell>
            <TableCell onClick={() => this.props.sort('name')}>Expense Name</TableCell>
            <TableCell onClick={() => this.props.sort('amount')}>Amount Spent</TableCell>
            <TableCell >Edit Expense</TableCell>
            <TableCell>Delete Expense</TableCell>
          </TableRow>


            <TableBody>
            {
              this.props.expenses && this.props.expenses.map((expense,i) => {
                let formatted_date=moment(expense.date).format("YYYY-MM-DD");
                return(
                  <TableRow key={i}>
                    <TableCell>{expense.sno}</TableCell>
                    <TableCell>{formatted_date}</TableCell>
                    <TableCell>{expense.name}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell> <Link exact to={"/edit/"+expense._id}><EditIcon /></Link></TableCell>

                    <TableCell><Button onClick={() => this.props.deleteHandler(expense,i)}><DeleteIcon /></Button></TableCell>
                  </TableRow>

                )
              })
            }
            </TableBody>
            </Table>


        <br /><br />
        <div className="button1">
          <Button variant="contained" color="secondary" onClick={this.exportPDF}>Download</Button>
        </div>


      </Fragment>

    )

  }
}





TableData.propTypes = {
  expenses:
    PropTypes.arrayOf(
      PropTypes.shape({
        sno: PropTypes.number,
        date: PropTypes.string,
        name: PropTypes.string,
        amount: PropTypes.number
      })
    )


}

export default TableData;
