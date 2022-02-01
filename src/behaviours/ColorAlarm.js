import '../App.css';
import { Box, Slider, Typography} from '@material-ui/core';
import MyStyles,{WrapUI} from '../MyStyles'
import { makeStyles,withStyles } from '@material-ui/core/styles';

import React, {useState,useEffect} from "react"


export default (props) => {
  const data = props['block']['data'] || {}
  const [start, setStart] = useState(data['start'] || 0.02)
  const [end, setEnd] = useState(data['end'] || 0.1)
  const [hour, setHour] = useState(data['hour'] || 7)
  const [minute, setMinute] = useState(data['minute'] || 0)

  const useStyles = makeStyles(MyStyles);
  const classes = useStyles();

  useEffect(() => {
    console.log("Updating PixelClock block with: " + JSON.stringify(props))
    setStart(data['start'] || 0.02)
    setEnd(data['end'] || 0.1)
    setHour(data['hour'] || 7)
    setMinute(data['minute'] || 0)
  },[data['start'],data['end'],data['hour'],data['minute']])

  const send = () => {
    console.log(JSON.stringify(props.callbacks))
    props.callbacks.sendData(props,{ start: start,end:end,hour:hour,minute:minute });
  }

  return <React.Fragment>
      <Box component="span">

        <Typography id="position-slider" gutterBottom>Position</Typography>
        <Slider
          aria-labelledby="position-slider"
          value={[start,end]} step={0.001} min={0.0} max={1.0}
          onChange={(e, val) => {setStart(val[0]);setEnd(val[1])}} onChangeCommitted={send}/>

        <Typography id="hour-slider" gutterBottom>Hour</Typography>
        <Slider
          aria-labelledby="hour-slider"
          marks
          valueLabelDisplay="on"
          value={hour} step={1} min={0} max={23}
          onChange={(e, val) => setHour(val)} onChangeCommitted={send}/>

        <Typography id="minute-slider" gutterBottom>Minute</Typography>
        <Slider
          aria-labelledby="minute-slider"
          marks
          valueLabelDisplay="on"
          value={minute} step={1} min={0} max={59}
          onChange={(e, val) => setMinute(val)} onChangeCommitted={send}/>

      </Box>
    </React.Fragment>
}

//export default Fill;
