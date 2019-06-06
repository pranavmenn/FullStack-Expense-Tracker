import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Fragment } from 'react';
import './home.css';

const HistoryCard = () => {
  return(

    <Fragment>
    <Card>
      <CardMedia style={{height:0}, {paddingTop:'56.25%'}} title="View Expense Chart" image={require("../../image/images.png")} />
      <CardContent>
        <Typography>
          Click below to see your expense chart
        </Typography>
      </CardContent>

    </Card>
  </Fragment>

  )
}


export default HistoryCard;
