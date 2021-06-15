import '../App.css';
import { Box, Slider, Typography} from '@material-ui/core';
import MyStyles,{WrapUI} from '../MyStyles'
import { makeStyles,withStyles } from '@material-ui/core/styles';

import React, {useState,useEffect} from "react"


export default (props) => {
  const data = props['block']['data'] || {}
  const [length, setLength] = useState(data['length'] || 10)
  const [factor, setFactor] = useState(data['factor'] || 10)

  const useStyles = makeStyles(MyStyles);
  const classes = useStyles();

  useEffect(() => {
    console.log("Updating Watchdog block with: " + JSON.stringify(props))
    setLength(data['length'] || 10 )
    setFactor(data['factor'] || 10)
  },[data['length'],data['factor']])

  const send = () => {
    console.log(JSON.stringify(props.callbacks))
    props.callbacks.sendData(props,{ length: length,factor:factor });
  }
  return <React.Fragment>
      <Box component="span">

        <Typography id="len-slider" gutterBottom>Length</Typography>
        <Slider
          aria-labelledby="discrete-slider-small-steps"
          valueLabelDisplay="on"
          marks
          value={length} step={1} min={2} max={30}
          onChange={(e, val) => setLength(val)} onChangeCommitted={send}/>

          <Typography id="factor-slider" gutterBottom>Factor</Typography>
          <Slider
            aria-labelledby="discrete-slider-small-steps"
            valueLabelDisplay="on"
            marks
            value={factor} step={1} min={1} max={30}
            onChange={(e, val) => setFactor(val)} onChangeCommitted={send}/>

      </Box>
    </React.Fragment>
}

//export default Fill;
