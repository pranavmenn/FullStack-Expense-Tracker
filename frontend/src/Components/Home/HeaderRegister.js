 import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


class Header extends Component{

  render(){
    return(
      <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Sign up for an account!
          </Typography>
        </Toolbar>
      </AppBar>
      </div>
    )
  }
}

export default Header;
