import '../App.css';
import { Button, Box, Slider, Typography,Container,Paper,Card,CardContent } from '@mui/material';

import React, {useState, useEffect } from "react"


export default (props) => {
  const data = props['block']['data'] || {}
  const [red, setRed] = useState(data['r'] || 0.0)
  const [green, setGreen] = useState(data['g'] || 0.0)
  const [blue, setBlue] = useState(data['b'] || 0.0)
  const [white, setWhite] = useState(data['w'] || 0.0)
  const [rate, setRate] = useState(data['rate'] || 0.0)
  const [width, setWidth] = useState(data['rate'] || 0.0)

  useEffect(() => {
    console.log("Updating Fill block with: " + JSON.stringify(props))
    setRed(data['r'])
    setGreen(data['g'])
    setBlue(data['b'])
    setWhite(data['w'])
    setRate(data['rate'])
    setWidth(data['width'])
  },[data['r'],data['g'],data['b'],data['w'],data['width'],data['rate']])

  const send = () => {
    props.callbacks.sendData(props,{ r: red, g: green, b: blue, w: white, rate:rate, width:width });
  }

  return <React.Fragment>
    <Box component="span" >
      <Typography id="r-slider" gutterBottom>R</Typography>
      <Slider
      aria-labelledby="r-slider"
      value={red} step={0.001} min={0.0} max={1.0}
      onChange={(e, val) => setRed(val)} onChangeCommitted={send}/>
    </Box>
    <Box component="span" >
      <Typography id="g-slider" gutterBottom>G</Typography>
      <Slider
      aria-labelledby="g-slider"
      value={green} step={0.001} min={0.0} max={1.0}
      onChange={(e, val) => setGreen(val)} onChangeCommitted={send}/>
    </Box>
    <Box component="span" >
      <Typography id="b-slider" gutterBottom>B</Typography>
      <Slider
      aria-labelledby="b-slider"
      value={blue} step={0.001} min={0.0} max={1.0}
      onChange={(e, val) => setBlue(val)} onChangeCommitted={send}/>
    </Box>
    <Box component="span" >
      <Typography id="w-slider" gutterBottom>W</Typography>
      <Slider
      aria-labelledby="w-slider"
      value={white} step={0.001} min={0.0} max={1.0}
      onChange={(e, val) => setWhite(val)} onChangeCommitted={send}/>
    </Box>
    <Box component="span" >
      <Typography id="r-slider" gutterBottom>Rate</Typography>
      <Slider
      aria-labelledby="r-slider"
      value={rate} step={0.001} min={0.0} max={1.0}
      onChange={(e, val) => setRate(val)} onChangeCommitted={send}/>
    </Box>
    <Box component="span" >
      <Typography id="width-slider" gutterBottom>Width</Typography>
      <Slider
      aria-labelledby="width-slider"
      value={width} step={0.001} min={0.0} max={0.3}
      onChange={(e, val) => setWidth(val)} onChangeCommitted={send}/>
    </Box>
  </React.Fragment>
}

//export default Fill;
