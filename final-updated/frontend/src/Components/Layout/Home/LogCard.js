import {Fragment} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter  } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import LogForm from './LogForm';
import './home.css';

const Logcard = () => {


  return(

    <Fragment >
      <BrowserRouter>
        <Route  path="/home/log" exact component={LogForm} />

        <Card>
          <CardMedia style={{height:0}, {paddingTop:'56.25%'}} title="Log your Expenses" image={require("../../image/download1.png")} />
          <CardContent>
            <Typography>
              Click below to log your Expenses
            </Typography>

          </CardContent>

        </Card>

      </BrowserRouter>
  </Fragment>

  )
}



export default Logcard;
