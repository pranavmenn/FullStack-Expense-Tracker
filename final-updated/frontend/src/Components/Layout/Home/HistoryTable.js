import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
//import { connect } from 'react-redux';
import axios from "axios";
import TableData from "./TableData";
import Edit from "./Edit";
import "./history.css";
import SearchByDate from "./SearchByDate";
import moment from "moment";
import withSpinner from "./withSpinner";
import ShopContext from "../../../context/shop-context";
import Header from "./Header";
const TableWithSpinner = withSpinner(TableData);

class HistoryTable extends Component {
  static contextType = ShopContext;

  state = {
    redirect: false,
    loading: true,
    expenses: [],
    date: "",
    searchByDate: false,
    online: true
    /*  expenseTrial:[{sno:"hello",date:"2019-12-12", name:"aaa", amount: 250}] */
  };

  componentDidMount() {
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
    console.log("hello", navigator.online);
    if (!navigator.onLine) {
      let data = JSON.parse(localStorage.getItem("Expenses"));
      console.log(data);
      this.setState({
        expenses: data,
        loading: false,
        online: false
      });
    } else {
      this.getData();
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getData = () => {
    const user = localStorage.getItem("username");
    axios.get("http://localhost:4000/api/getData/" + user).then(res => {
      this.setState({ expenses: res.data, loading: false });
      let tempData = JSON.stringify(this.state.expenses);
      localStorage.setItem("Expenses", tempData);
    });
  };

  offlineState = () => {};

  deleteHandler = (expense, i) => {
    console.log(i);
    axios
      .get("http://localhost:4000/api/deleteData/" + expense._id)
      .then(this.getData())
      .catch(err => console.log(err));
  };

  search = () => {
    this.setState({
      searchByDate: true
    });
    /*const { date } = this.state;
  const formatted_date=moment(this.state.date).format("YYYY-MM-DD");
  axios.get("http://localhost:4000/api/getByDate/"+formatted_date)
  .then(res =>{
    this.setState({expenses: res.data})
  });*/
  };

  sort = field => {
    this.setState({
      expenses: this.state.expenses.sort((a, b) =>
        a[field] < b[field] ? -1 : 1
      )
    });
    console.log(this.state.expenses);
  };

  download = () => {
    axios.post("/create-pdf", this.state);
  };

  render() {
    if (!this.state.online) {
      return (
        <TableData
          sort={this.sort}
          expenses={this.state.expenses}
          deleteHandler={this.deleteHandler}
          isLoading={this.state.loading}
        />
      );
    }

    if (this.state.searchByDate) {
      return <SearchByDate date={this.state.date} getData={this.getData} />;
    }

    {
      /*
  if(!this.context.isLoggedin){
      alert("User Logged Out already");
      return <Redirect exact to ="/" />
    }
  */
    }

    {
      //if ( this.state.redirect ){
      /*  if(this.props.state.status.isLoggedin==false){
        console.log("hello");
      alert('User logged out already');
      return   <Redirect exact to="/" />

    }*/
    }

    //isLoading
    const { expenses } = this.state;
    let name = localStorage.getItem("username");
    return (
      <div className="table">
        <Header />
        <Link to="/home">
          <Button variant="contained" color="primary">
            {" "}
            Go Back{" "}
          </Button>
        </Link>

        <div className="search">
          <h3>Search by date</h3>
          <TextField name="date" type="date" onChange={this.handleChange} />
          <br />
          <Button variant="contained" color="primary" onClick={this.search}>
            {" "}
            Search{" "}
          </Button>
        </div>
        <br />
        <h4>**Click on a table cell to order the data in ascending**</h4>
        <div className="heading">
          <h3>Expense History for {name} </h3>
        </div>

        <TableWithSpinner
          sort={this.sort}
          expenses={this.state.expenses}
          deleteHandler={this.deleteHandler}
          isLoading={this.state.loading}
        />

        <br />
        <br />
      </div>
    );
  }
}

{
  /*function mapStateToProps(state,ownProps){
  return{
    state: state
  }
}
*/
}

{
  /*export default connect(mapStateToProps) (HistoryTable);*/
}

export default HistoryTable;
