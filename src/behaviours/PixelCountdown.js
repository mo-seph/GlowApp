import '../App.css';
import { Box, Slider, Typography, Button, Switch} from '@material-ui/core';
import MyStyles,{WrapUI} from '../MyStyles'
import { makeStyles,withStyles } from '@material-ui/core/styles';

import React, {useState,useEffect} from "react"


export default (props) => {
  const data = props['block']['data'] || {}
  const [start, setStart] = useState(data['start'] || 10)
  const [length, setLength] = useState(data['length'] || 1)
  const [running, setRunning] = useState(data['running'] || 1)
  const [time, setTime] = useState(data['time'] || 1)

  const useStyles = makeStyles(MyStyles);
  const classes = useStyles();

  useEffect(() => {
    console.log("Updating PixelClock block with: " + JSON.stringify(props))
    setStart(data['start'])
    setLength(data['length'])
    setRunning(data['running'])
  },[data['start'],data['length'],data['running']])

  const send = () => {
    console.log(JSON.stringify(props.callbacks))
    props.callbacks.sendData(props,{ start: start,length:length });
  }

  const activate = () => {
    props.callbacks.sendData(props,{ time: Math.floor(time*60)});
  }
  const deactivate = () => {
    props.callbacks.sendData(props,{ time: time});
  }

 return <React.Fragment>
      <Box component="span">

        <Typography id="start-slider" gutterBottom>Position</Typography>
        <Slider
          marks
          value={start} step={0.001} min={0.0} max={1.0}
          onChange={(e, val) => setStart(val)} onChangeCommitted={send}/>

        <Typography id="length-slider" gutterBottom>Length</Typography>
        <Slider
          aria-labelledby="discrete-slider-small-steps"
          valueLabelDisplay="on"
          marks
          value={length} step={1} min={10} max={200}
          onChange={(e, val) => setLength(val)} onChangeCommitted={send}/>

        <Box>
        <Typography id="scale-slider" gutterBottom>Time</Typography>
        <Slider
          aria-labelledby="discrete-slider-small-steps"
          valueLabelDisplay="on"
          marks
          value={time} step={0.5} min={0.5} max={60}
          onChange={(e, val) => setTime(val)} />
        <Button variant="contained" color="primary" disabled={running ? true : false}
          onClick={() => { activate() }} >
          Start
        </Button>
        <Button variant="contained" color="secondary" disabled={running ? false : true}
          onClick={() => { deactivate() }} >
          Cancel
        </Button>
        </Box>
      </Box>
    </React.Fragment>
}

//export default Fill;
