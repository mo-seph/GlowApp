import '../App.css';
import { Box, Slider, Typography} from '@material-ui/core';
import MyStyles,{WrapUI} from '../MyStyles'
import { makeStyles,withStyles } from '@material-ui/core/styles';

import React, {useState,useEffect} from "react"


export default (props) => {
  const data = props['block']['data'] || {}
  const [start, setStart] = useState(data['start'] || 10)
  const [scale, setScale] = useState(data['scale'] || 1)

  const useStyles = makeStyles(MyStyles);
  const classes = useStyles();

  useEffect(() => {
    console.log("Updating PixelClock block with: " + JSON.stringify(props))
    setStart(data['start'])
    setScale(data['scale'])
  },[data['start'],data['scale']])

  const send = () => {
    console.log(JSON.stringify(props.callbacks))
    props.callbacks.sendData(props,{ start: start,scale:scale });
  }

  const ui =
 <React.Fragment>
      <Box component="span">

        <Typography id="start-slider" gutterBottom>Start</Typography>
        <Slider
          aria-labelledby="discrete-slider-small-steps"
          marks
          value={start} step={1} min={2} max={300}
          onChange={(e, val) => setStart(val)} onChangeCommitted={send}/>

          <Typography id="scale-slider" gutterBottom>Scale</Typography>
          <Slider
            aria-labelledby="discrete-slider-small-steps"
            marks
            value={scale} step={1} min={1} max={5}
            onChange={(e, val) => setScale(val)} onChangeCommitted={send}/>

      </Box>
    </React.Fragment>
  return ( WrapUI(ui,props) );
}

//export default Fill;
