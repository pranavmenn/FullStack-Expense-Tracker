import React, { Component, Fragment } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Monthly extends Component{
  render(){
    return(
      <Fragment>
      <p>Get expense data by month:</p>
      <Select onChange={this.props.handleChange} >
        <MenuItem value="0">  <em>All</em> </MenuItem>
        <MenuItem value="01">January</MenuItem>
        <MenuItem value="02">February</MenuItem>
        <MenuItem value="03">March</MenuItem>
        <MenuItem value="04">April</MenuItem>
        <MenuItem value="05">May</MenuItem>
        <MenuItem value="06">June</MenuItem>
        <MenuItem value="07">July</MenuItem>
        <MenuItem value="08">August</MenuItem>
        <MenuItem value="09">September</MenuItem>
        <MenuItem value="10">October</MenuItem>
        <MenuItem value="11">November</MenuItem>
        <MenuItem value="12">December</MenuItem>

      </Select>
      </Fragment>
    )
  }
}

export default Monthly;
