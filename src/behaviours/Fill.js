import '../App.css';
import { Button, Box, Slider, Typography,Container,Paper,Card,CardContent } from '@material-ui/core';
import MyStyles,{WrapUI} from '../MyStyles'

import React, {useState, useEffect } from "react"


export default (props) => {
  const [red, setRed] = useState(0.0)
  const [green, setGreen] = useState(0.0)
  const [blue, setBlue] = useState(0.0)
  const [white, setWhite] = useState(0.0)

  useEffect(() => {
    //send()
  })

  const send = () => {
    props.callbacks.send(props,{ r: red, g: green, b: blue, w: white });
  }

  const ui =
  <React.Fragment>
    <Box component="span" >
      <Typography id="r-slider" gutterBottom>R</Typography>
      <Slider
      aria-labelledby="r-slider"
      defaultValue={0.0} step={0.001} min={0.0} max={1.0}
      onChange={(e, val) => setRed(val)} onChangeCommitted={send}/>
    </Box>
    <Box component="span" >
      <Typography id="g-slider" gutterBottom>G</Typography>
      <Slider
      aria-labelledby="g-slider"
      defaultValue={0.0} step={0.001} min={0.0} max={1.0}
      onChange={(e, val) => setGreen(val)} onChangeCommitted={send}/>
    </Box>
    <Box component="span" >
      <Typography id="b-slider" gutterBottom>B</Typography>
      <Slider
      aria-labelledby="b-slider"
      defaultValue={0.0} step={0.001} min={0.0} max={1.0}
      onChange={(e, val) => setBlue(val)} onChangeCommitted={send}/>
    </Box>
    <Box component="span" >
      <Typography id="w-slider" gutterBottom>W</Typography>
      <Slider
      aria-labelledby="w-slider"
      defaultValue={0.0} step={0.001} min={0.0} max={1.0}
      onChange={(e, val) => setWhite(val)} onChangeCommitted={send}/>
    </Box>
  </React.Fragment>
  return ( WrapUI(ui,props.block.behaviour,props.block.id) );
}

//export default Fill;
