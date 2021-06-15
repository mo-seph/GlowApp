import './App.css';
import { Box, Slider, Typography, Button, Switch, Card, CardHeader, CardContent} from '@material-ui/core';
import MyStyles,{WrapUI} from './MyStyles'
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Behaviours from "./Behaviours";
import BrushIcon from '@material-ui/icons/Brush';


import React, {useState,useEffect} from "react"


export default (props,functionsIn) => {
  const behaviours = props['state'] || []
  const device = props['device'] || {}
  console.log("Got props for Device: ",props)
  console.log("Got functions for Device: ",functionsIn)

  const useStyles = makeStyles(MyStyles);
  const classes = useStyles();

  useEffect(() => {
  },[])

  const functions = {
    sendData : functionsIn.sendData(device),
    sendCommand : functionsIn.sendCommand(device),
  }

  return(
    <>
  <Card className={classes.device_card} key={device.id}>
    <CardHeader
      avatar={
        <BrushIcon/>
      }
      title={
        <>
        {props.device.name}
        </>
      }
      subheader={
        <>
        {"ID: " + props.device.id + ", Type: " + props.device.name}<br/>
        <Button color="primary"
          onClick={() => { functions.sendCommand({state:1}) }} >
          Update</Button>
        </>
      }
      style={MyStyles.cardHeader}
    />
    <CardContent className={classes.cardContent}>
      {JSON.stringify(device)}
    </CardContent>
    {behaviours.map(behaviour => Behaviours(behaviour,functions))}
  </Card>
  </>
)
}

//export default Fill;
