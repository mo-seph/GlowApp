import React, {useState, useEffect } from "react"
import { Card,CardContent,CardHeader,Switch} from '@mui/material';
//import { makeStyles,withStyles } from '@mui/';
import BrushIcon from '@mui/icons-material/Brush';
//import MyStyles from './MyStyles'


import Fill from "./behaviours/Fill";
import Watchdog from "./behaviours/Watchdog";
import NotFound from "./behaviours/NotFound";
import GlowBall from "./behaviours/GlowBall";
import PixelClock from "./behaviours/PixelClock";
import PixelCountdown from "./behaviours/PixelCountdown";
import ColorAlarm from "./behaviours/ColorAlarm";
import Fire from "./behaviours/Fire";
import { useTheme } from '@mui/material/styles';




const Behaviours = {
  Fill: Fill,
  Glow: GlowBall,
  Fire: Fire,
  Watchdog: Watchdog,
  PixelClock: PixelClock,
  ColorAlarm: ColorAlarm,
  PixelCountdown: PixelCountdown
};


export default (props) => {
  if( ! props.block ) return <></>
  const handleChange = (e,v) => {
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
  const theme = useTheme()
  return (
    <Card key={props.block.id} >
      <CardHeader
        avatar="."
        sx={{background: theme.palette.grey.A400}}
        title={props.block.name}
        subheader={"ID: " + props.block.id + ", Type: " + props.block.type}
        action={<Switch 
                checked={props.block.active || false}
                onChange={handleChange}
                name="active" color="primary"
              />}
      />
      <CardContent > {content} </CardContent>
    </Card>
 );
      //className={classes.cardContent}
}
