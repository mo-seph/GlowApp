import './App.css';
import { Box, Slider, Typography, Button, Switch, Card, CardHeader, CardContent} from '@material-ui/core';
import MyStyles,{WrapUI} from './MyStyles'
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Behaviour from "./Behaviour";
import BrushIcon from '@material-ui/icons/Brush';


import React, {useState,useEffect} from "react"


export default (props,functionsIn) => {
  const behaviours = props['state'] || []
  const device = props['device'] || {}

  const useStyles = makeStyles(MyStyles);
  const classes = useStyles();

  const functions = {
    sendData : props.functions.sendData(device),
    sendCommand : props.functions.sendCommand(device),
  }

  const getState = () => { functions.sendCommand({state:1}) }

  return(
    <>
  <Card  key={device.id} style={MyStyles.card}>
    <CardHeader
      avatar={ <BrushIcon/> }
      title={ props.device.name }
      action={
        <Button color="primary" onClick={getState}> Update</Button>
      }
      subheader={ "ID: " + props.device.id + ", Type: " + props.device.name }
      style={MyStyles.cardHeader}
    />
  </Card>
  {behaviours.map((behaviour,i) => <Behaviour block={behaviour} functions={functions} key={i}/>)}
  </>
)
}


//export default Fill;
