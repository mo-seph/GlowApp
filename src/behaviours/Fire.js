import '../App.css';
import { Box, Slider, Typography} from '@material-ui/core';
import MyStyles,{WrapUI} from '../MyStyles'
import { makeStyles,withStyles } from '@material-ui/core/styles';

import React, {useState,useEffect} from "react"


export default (props) => {
  const data = props['block']['data'] || {}
  console.log("Got PixelData: " + JSON.stringify(data));
  const [intensity, setIntensity] = useState(data['intensity'] || 0.9)
  const [speed, setScale] = useState(data['speed'] || 0.1)

  const useStyles = makeStyles(MyStyles);
  const classes = useStyles();

  useEffect(() => {
    console.log("Updating Fire block with: " + JSON.stringify(props))
    setStart(data['intensity'] || 10)
    setScale(data['speed'] || 1)
  },[data['intensity'],data['speed']])

  const send = () => {
    console.log(JSON.stringify(props.callbacks))
    props.callbacks.sendData(props,{ start: start,scale:scale });
  }

  return <React.Fragment>
      <Box component="span">

        <Typography id="intensity-slider" gutterBottom>Start</Typography>
        <Slider
          aria-labelledby="intensity-slider"
          value={intensity} step={0.01} min={0.0} max={1.0}
          onChange={(e, val) => setIntensity(val)} onChangeCommitted={send}/>

          <Typography id="speed-slider" gutterBottom>Scale</Typography>
          <Slider
            aria-labelledby="speed-slider"
            value={speed} step={0.001} min={0.001} max={0.1}
            onChange={(e, val) => setSpeed(val)} onChangeCommitted={send}/>

      </Box>
    </React.Fragment>
}

//export default Fill;
