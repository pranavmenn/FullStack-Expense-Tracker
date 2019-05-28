import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import React, { Component } from 'react';
import { BrowserRouter, Link  } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Historytable from './HistoryTable';

import './home.css';
class HistoryCard extends Component{
  render(){
    return(




            <div className="logCard-2">
          <Card>
            <CardMedia style={{height:0}, {paddingTop:'56.25%'}} title="View Expense History" image={require("./image/images.jpg")} />
            <CardContent>
              <Typography>
                Click below to see your expense history
              </Typography>
            </CardContent>
            
          </Card>
        </div>
    )
  }
}

export default HistoryCard;
