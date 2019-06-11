import React, { Component,Fragment } from 'react';
import {Line} from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './chart.css';
import Monthly from './Monthly';


class Chart extends Component{

  state = {
    expenses: [],
    done: false,
    chartData:[],
    byMonth: false,
    monthlyAmount:0

  }
  newExpense=[];

  getData = () =>{
    const user=localStorage.getItem('username');
    axios.get("http://localhost:4000/api/getData/"+user)
    .then(res=>{

      this.setState({expenses: res.data, loading: false})
      this.data();
    });
  }

  handleChange = (event) =>{
    let month = event.target.value;
    if(month=="0"){
      this.getData();
    }
    let tempExpense=this.newExpense;
    let amount=[];
    let dates = tempExpense.map(exp=>exp.date=moment(exp.date).format("YYYY-MM-DD"));
    //let dates=tempExpense.filter(exp => { return moment(exp.date).format("YYYY-MM-DD").month()===month });
    let displayDate=dates.filter(date => { return moment(date).month()+1==month});
    console.log(displayDate);
    tempExpense.forEach(exp=>{
      displayDate.forEach(date=>{
        if(date==moment(exp.date).format("YYYY-MM-DD")){
          amount.push(exp.amount);
        }
      })
    })

    console.log(amount);

  
    this.setState({
      chartData: {
        labels: displayDate,
        datasets:[
          {
            label: 'Expense',
            data: amount,
            backgroundColor:'rgba(75,192,192,0.6)'
          }
        ],
        options:{
          scales: {
            yAxes:[{
              ticks:{
                scaleBeginAtZero: true
              }
            }]
          }
        }
        }
      ,
      byMonth: true,

    })
  }


  componentDidMount(){
    this.getData();
  }

  data = () =>{
    this.setState({
      expenses: this.state.expenses.sort((a,b)=>a[this.state.expenses.date]<b[this.state.expenses.date]?-1:1)
    })
    this.state.expenses.forEach(expense => {
      const expFound= this.newExpense.findIndex(exp => exp.date===expense.date);
      if(expFound==-1){
        this.newExpense.push(expense)
      }
      else if(expFound!=-1){
        this.newExpense[expFound]={...this.newExpense,
                                  date:this.newExpense[expFound].date,
                                  amount: this.newExpense[expFound].amount+expense.amount}

      }
      this.setState({
        done: true,
        chartData: {
          labels: this.newExpense.map(expense => moment(expense.date).format("YYYY-MM-DD")),
          datasets:[
            {
              label: 'Expense',
              data:this.newExpense.map(expense=>expense.amount),
              backgroundColor:'rgba(75,192,192,0.6)'
            }
          ],
          scales: {
            yAxes:[{
              stacked: true,
              ticks: {
                 min: 0,
                 stepSize: 1,
                 scaleBeginAtZero: true
             }
            }]
          }
        }
      })

    });
  }


  render(){

  {/*}  console.log(this.state.chartData.labels);
    if(this.state.done){
      console.log(this.newExpense);
    }*/}

    if(this.state.byMonth){
      console.log(this.state.chartData);
      return  (
        <Fragment>
          <div >
          <Link to="/home"><Button variant="contained" color="primary"> Go Back  </Button></Link>
          </div>
          <div className="chart">
            <div className="month">
              <Monthly handleChange={this.handleChange}/>
            </div>
            <div className="graph">
              <Line data={this.state.chartData}/>
            </div>
          </div>
        </Fragment>


      )

    }
    return(
      <Fragment>
        <div >
        <Link to="/home"><Button variant="contained" color="primary"> Go Back  </Button></Link>
        </div>
        <div className="chart">
          <h3>DashBoard</h3>
            <div className="month">
              <Monthly handleChange={this.handleChange}/>
            </div>
          <div className="graph">
            <Line data={this.state.chartData}/>
          </div>

        </div>
      </Fragment>

    )

  }
}

export default Chart;
