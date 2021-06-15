import '../App.css';
import { Button, Box, Slider, Typography,Container,Paper,Card,CardContent } from '@material-ui/core';
import MyStyles,{WrapUI} from '../MyStyles'

import React, {useState, useEffect } from "react"


export default (props) => {
  const data = props['block']['data'] || {}
  const [red, setRed] = useState(data['r'] || 0.0)
  const [green, setGreen] = useState(data['g'] || 0.0)
  const [blue, setBlue] = useState(data['b'] || 0.0)
  const [white, setWhite] = useState(data['w'] || 0.0)
  const [time, setTime] = useState(data['time'] || 0.0)

  useEffect(() => {
    console.log("Updating Fill block with: " + JSON.stringify(props))
    setRed(data['r'])
    setGreen(data['g'])
    setBlue(data['b'])
    setWhite(data['w'])
    setTime(data['time'])
  },[data['r'],data['g'],data['b'],data['w'],data['time']])

  const send = () => {
    props.callbacks.sendData(props,{ r: red, g: green, b: blue, w: white, time:time });
  }

  var ui =
  <React.Fragment>
    <Box component="span" key="red">
      <Typography id="r-slider" gutterBottom>R</Typography>
      <Slider
      aria-labelledby="r-slider"
      value={red} step={0.001} min={0.0} max={1.0}
      onChange={(e, val) => setRed(val)} onChangeCommitted={send}/>
    </Box>
    <Box component="span" key="green">
      <Typography id="g-slider" gutterBottom>G</Typography>
      <Slider
      aria-labelledby="g-slider"
      value={green} step={0.001} min={0.0} max={1.0}
      onChange={(e, val) => setGreen(val)} onChangeCommitted={send}/>
    </Box>
    <Box component="span" key="blue">
      <Typography id="b-slider" gutterBottom>B</Typography>
      <Slider
      aria-labelledby="b-slider"
      value={blue} step={0.001} min={0.0} max={1.0}
      onChange={(e, val) => setBlue(val)} onChangeCommitted={send}/>
    </Box>
    <Box component="span" key="white">
      <Typography id="w-slider" gutterBottom>W</Typography>
      <Slider
      aria-labelledby="w-slider"
      value={white} step={0.001} min={0.0} max={1.0}
      onChange={(e, val) => setWhite(val)} onChangeCommitted={send}/>
    </Box>
    <Box component="span" >
      <Typography id="t-slider" gutterBottom>Interp</Typography>
      <Slider
      aria-labelledby="t-slider"
      value={time} step={0.001} min={0.0} max={20.0}
      onChange={(e, val) => setTime(val)} onChangeCommitted={send}/>
    </Box>
  </React.Fragment>
  return ( WrapUI(ui,props) );
}

//export default Fill;
