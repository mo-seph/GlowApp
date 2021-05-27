import { Button, Box, Slider, Typography,Container,Paper,Card,CardContent,CardHeader,FormControlLabel,Switch,Grid } from '@material-ui/core';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import BrushIcon from '@material-ui/icons/Brush';

import React, {useState, useEffect } from "react"

const MyStyles = {
  root: {
    //height: 300,
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //width:400,
  },
  sliderGroup: {
    height:200,
  },
  card: {
    width:380,
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    },
    margin: "20px"
  },
  cardContent: {
    background: "#eee"
  },
  cardHeader: {
    background: 'linear-gradient(to bottom, #ddd, #ccc)',
    textAlign: 'left'
  }
};

export const WrapUI = (input,props) => {
  const useStyles = makeStyles(MyStyles);
  const classes = useStyles();
  console.log(JSON.stringify(props))
  const handleChange = (e,v) => {
    console.log("Event: "+e+" val: " + v)
    if( v ) props.callbacks.sendCommand({activate:props.block.id})
    else props.callbacks.sendCommand({deactivate:props.block.id})
  }
  const content = props.block.active ? input : <></>
  return (
    <Card className={classes.card} key={props.block.id}>
      <CardHeader
        avatar={
          <BrushIcon/>
        }
        action={
          <FormControlLabel
            label="Active"
            control={
              <Switch
                checked={props.block.active || false}
                onChange={handleChange}
                size="small"
                name="active" color="primary"
              />
          } />
        }
        title={props.block.type}
        subheader={"ID: " + props.block.id}
        style={MyStyles.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        {content}
      </CardContent>
    </Card>
 );
}

export default MyStyles
