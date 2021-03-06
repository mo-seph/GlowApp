import '../App.css';
import { Box, Slider, Typography, Button, Switch} from '@mui/material';

import React, {useState,useEffect} from "react"
import { LabelHSlider } from '../UIElements';


export default (props) => {
  const data = props['block']['data'] || {}
  const [start, setStart] = useState(data['start'] || 10)
  const [length, setLength] = useState(data['length'] || 1)
  const [running, setRunning] = useState(data['running'] || 1)
  const [time, setTime] = useState(data['time'] || 1)

  useEffect(() => {
    console.log("Updating PixelClock block with: " + JSON.stringify(props))
    setStart(data['start'])
    setLength(data['length'])
    setRunning(data['running'])
  },[data['start'],data['length'],data['running']])

  const send = () => {
    console.log(JSON.stringify(props.callbacks))
    props.callbacks.sendData(props,{ start: start,length:length });
  }

  const activate = () => {
    props.callbacks.sendData(props,{ time: Math.floor(time*60)});
  }
  const deactivate = () => {
    props.callbacks.sendData(props,{ time: time});
  }

 return <React.Fragment>
      <Box component="span">

        {LabelHSlider("start-slider","Position",
        <Slider
          marks
          value={start} step={0.001} min={0.0} max={1.0}
          onChange={(e, val) => setStart(val)} onChangeCommitted={send}/>
        )}
        {LabelHSlider("length-slider","Length",
        <Slider
          aria-labelledby="length-slider"
          value={length} step={1} min={10} max={200}
          onChange={(e, val) => setLength(val)} onChangeCommitted={send}/>
        )}

        {LabelHSlider("scale-slider","Time",
          <Slider
            aria-labelledby="scale-slider"
            valueLabelDisplay="on"
            marks
            value={time} step={0.5} min={0.5} max={60}
            onChange={(e, val) => setTime(val)} />
        )}
        <Box>
        <Button variant="contained" color="primary" disabled={running ? true : false}
          onClick={() => { activate() }} >
          Start
        </Button>
        <Button variant="contained" color="secondary" disabled={running ? false : true}
          onClick={() => { deactivate() }} >
          Cancel
        </Button>
        </Box>
      </Box>
    </React.Fragment>
}

//export default Fill;
