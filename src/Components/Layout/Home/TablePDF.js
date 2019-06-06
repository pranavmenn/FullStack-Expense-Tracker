import React,{Component,Fragment} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import './history.css';
import moment from 'moment';
import { PDFExport } from '@progress/kendo-react-pdf';


class TablePDF extends Component{

  save = () =>{
    this.table.save();
  }
  render(){
    return(
      <Fragment>

        <PDFExport paperSize={'Letter'} fileName="expense.pdf" title="Your expense" ref ={(r) => this.table = r}>
          <Table>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >Date</TableCell>
            <TableCell >Expense Name</TableCell>
            <TableCell >Amount Spent</TableCell>
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
                  </TableRow>

                )
              })
            }
            </TableBody>
            </Table>


        </PDFExport>
        <Button variant="contained" color="secondary" onClick={this.save}>Confirm Save</Button>


      </Fragment>
    )
  }
}

export default TablePDF;
