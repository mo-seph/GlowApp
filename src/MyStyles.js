import { Button, Box, Slider, Typography,Container,Paper,Card,CardContent } from '@material-ui/core';
import { makeStyles,withStyles } from '@material-ui/core/styles';

import React, {useState, useEffect } from "react"

const MyStyles = {
  root: {
    //height: 300,
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //width:400,
  },
  slider: {
    height:300,
  },
  card: {
    width:400,
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  cardContent: {

  }
};

export const WrapUI = (input,title,id) => {
  const useStyles = makeStyles(MyStyles);
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.card}>
     <CardContent className={classes.cardContent}>
    <Typography variant='h5' align='center' gutterBottom>{title}</Typography>
     <Typography variant='h6' align='center' gutterBottom>ID: {id}</Typography>
     {input}
     </CardContent>
   </Card>
 );
}

export default MyStyles
