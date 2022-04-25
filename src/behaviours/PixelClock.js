import '../App.css';
import { Box, Slider, Typography} from '@mui/material';
import React, {useState,useEffect} from "react"


export default (props) => {
  const data = props['block']['data'] || {}
  console.log("Got PixelData: " + JSON.stringify(data));
  const [start, setStart] = useState(data['start'] || 10)
  const [scale, setScale] = useState(data['scale'] || 1)

  useEffect(() => {
    console.log("Updating PixelClock block with: " + JSON.stringify(props))
    setStart(data['start'] || 10)
    setScale(data['scale'] || 1)
  },[data['start'],data['scale']])

  const send = () => {
    console.log(JSON.stringify(props.callbacks))
    props.callbacks.sendData(props,{ start: start,scale:scale });
  }

  return <React.Fragment>
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
}

//export default Fill;
