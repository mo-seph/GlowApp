import '../App.css';
import { Box, Slider, Typography} from '@mui/material';
import React, {useState,useEffect} from "react"


export default (props) => {
  const data = props['block']['data'] || {}
  console.log("Got PixelData: " + JSON.stringify(data));
  const [intensity, setIntensity] = useState(data['intensity'] || 0.9)
  const [ripple, setRipple] = useState(data['ripple'] || 1.0)
  const [speed, setSpeed] = useState(data['speed'] || 0.1)

  useEffect(() => {
    console.log("Updating Fire block with: " + JSON.stringify(props))
    setIntensity(data['intensity'] || 10)
    setSpeed(data['speed'] || 1)
    setRipple(data['ripple'] || 1)
  },[data['intensity'],data['speed'],data['ripple']])

  const send = () => {
    console.log(JSON.stringify(props.callbacks))
    props.callbacks.sendData(props,{ intensity: intensity, speed:speed, ripple:ripple });
  }

  return <React.Fragment>
      <Box component="span">

        <Typography id="intensity-slider" gutterBottom>Intensity</Typography>
        <Slider
          aria-labelledby="intensity-slider"
          value={intensity} step={0.01} min={0.0} max={1.0}
          onChange={(e, val) => setIntensity(val)} onChangeCommitted={send}/>

          <Typography id="speed-slider" gutterBottom>Speed</Typography>
          <Slider
            aria-labelledby="speed-slider"
            value={speed} step={0.001} min={0.01} max={1.0}
            onChange={(e, val) => setSpeed(val)} onChangeCommitted={send}/>

         <Typography id="ripple-slider" gutterBottom>Ripple</Typography>
          <Slider
            aria-labelledby="ripple-slider"
            value={ripple} step={0.1} min={1.0} max={600.0}
            onChange={(e, val) => setRipple(val)} onChangeCommitted={send}/>
      </Box>
    </React.Fragment>
}

//export default Fill;
