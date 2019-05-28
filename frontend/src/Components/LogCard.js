import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Link, Switch  } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import LogForm from './LogForm';
import './home.css';

class Logcard extends Component{

render(){
  return(

    <div className="logCard-1">
      <BrowserRouter>
        <Route  path="/home/log" exact component={LogForm} />

        <Card>
          <CardMedia style={{height:0}, {paddingTop:'56.25%'}} title="Log your Expenses" image={require("./image/download1.png")} />
          <CardContent>
            <Typography>
              Click below to log your Expenses
            </Typography>

          </CardContent>

        </Card>

      </BrowserRouter>
  </div>

  )
}

}

export default Logcard;
