import React, {useState, useEffect } from "react"
import { Button, Box, Slider, Typography,Container,Paper,Card,CardContent,CardHeader,FormControlLabel,Switch,Grid } from '@material-ui/core';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import BrushIcon from '@material-ui/icons/Brush';
import MyStyles from './MyStyles'


import Fill from "./behaviours/Fill";
import Watchdog from "./behaviours/Watchdog";
import NotFound from "./behaviours/NotFound";
import GlowBall from "./behaviours/GlowBall";
import PixelClock from "./behaviours/PixelClock";
import Alarm from "./behaviours/Alarm";




const Behaviours = {
  Fill: Fill,
  Glow: GlowBall,
  Watchdog: Watchdog,
  PixelClock: PixelClock,
  Alarms: Alarm
};

/*
export default (block,callbacks) => {
  if( ! block ) return <></>;
  const name = block.type;
  var cls = Behaviours[name] || NotFound
  // component does exist

  const elem = React.createElement(cls, {
    key: block.id,
    block: block,
    callbacks:callbacks
  });
  return elem
}
*/

export default (props) => {
  if( ! props.block ) return <></>
  const useStyles = makeStyles(MyStyles);
  const classes = useStyles();
  const handleChange = (e,v) => {
    //console.log("Event: "+e+" val: " + v)
    if( v ) props.functions.sendCommand({activate:props.block.id})
    else props.functions.sendCommand({deactivate:props.block.id})
  }
  const name = props.block.type;
  var cls = Behaviours[name] || NotFound
  const elem = React.createElement(cls, {
    key: props.block.id,
    block: props.block,
    callbacks:props.functions
  });

  const content = props.block.active ? elem : <></>
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
        title={props.block.name}
        subheader={"ID: " + props.block.id + ", Type: " + props.block.type}
        style={MyStyles.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        {content}
      </CardContent>
    </Card>
 );
}
