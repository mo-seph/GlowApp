import '../App.css';
import { Box, Slider, Typography} from '@material-ui/core';
import {WrapUI} from '../MyStyles'

import React, {useState} from "react"


export default (props) => {
  const [length, setLength] = useState(0)
  const send = () => {
    props.callbacks.send(props,{ length: length });
  }
  const ui =
 <React.Fragment>
      <Box component="span" >
        <Typography id="len-slider" gutterBottom>Length</Typography>
        <Slider
          aria-labelledby="len-slider"
          defaultValue={10} step={1} min={1} max={30}
          onChange={(e, val) => setLength(val)} onChangeCommitted={send}/>
      </Box>
    </React.Fragment>
  return ( WrapUI(ui,props.block.behaviour,props.block.id) );
}

//export default Fill;
