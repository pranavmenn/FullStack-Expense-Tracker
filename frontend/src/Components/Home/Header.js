import React, { Component,Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const Header = () => {
  return(
    <Fragment>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Expense
        </Typography>
      </Toolbar>
    </AppBar>
  </Fragment>
  )
}


export default Header;
