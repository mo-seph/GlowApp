import '../App.css';
import {  Box, Slider, Typography, Stack, Tab} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import React, {useState, useEffect } from "react"


export default (props) => {
  const data = props['block']['data'] || {}
  const [red, setRed] = useState(data['r'] || 0.0)
  const [green, setGreen] = useState(data['g'] || 0.0)
  const [blue, setBlue] = useState(data['b'] || 0.0)
  const [white, setWhite] = useState(data['w'] || 0.0)
  const [time, setTime] = useState(data['time'] || 0.0)
  const [hue, setHue] = useState(data['h'] || 0.0)
  const [saturation, setSaturation] = useState(data['s'] || 0.0)
  const [intensity, setIntensity] = useState(data['v'] || 0.0)
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => { setValue(newValue); };

  useEffect(() => {
    console.log("Updating Fill block with: " + JSON.stringify(props))
    setRed(data['r'])
    setGreen(data['g'])
    setBlue(data['b'])
    setWhite(data['w'])
    setTime(data['time'])
  },[data['r'],data['g'],data['b'],data['w'],data['time']])

  const sendRGBW = () => {
    props.callbacks.sendData(props,{ r: red, g: green, b: blue, w: white});
  }
  const sendTime = () => {
    props.callbacks.sendData(props,{ time:time });
  }
  const sendHSV = () => {
    props.callbacks.sendData(props,{ h: hue, s: saturation, v: intensity});
  }

  return <React.Fragment>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="HSV" value="1" />
              <Tab label="RGB" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Stack sx={{ height: 200 }} spacing={1} direction="row">
              <Typography id="h-slider" gutterBottom>H</Typography>
              <Slider
              aria-labelledby="h-slider"
              orientation="vertical"
              value={hue} step={0.5} min={0.0} max={360.0}
              onChange={(e, val) => setHue(val)} onChangeCommitted={sendHSV}/>
              <Typography id="s-slider" gutterBottom>S</Typography>
              <Slider
              aria-labelledby="s-slider"
              orientation="vertical"
              value={saturation} step={0.01} min={0.0} max={1.0}
              onChange={(e, val) => setSaturation(val)} onChangeCommitted={sendHSV}/>
              <Typography id="v-slider" gutterBottom>I</Typography>
              <Slider
              aria-labelledby="v-slider"
              orientation="vertical"
              value={intensity} step={0.01} min={0.0} max={1.0}
              onChange={(e, val) => setIntensity(val)} onChangeCommitted={sendHSV}/>
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <Stack sx={{ height: 200 }} spacing={1} direction="row">
              <Typography id="r-slider" gutterBottom>R</Typography>
              <Slider
              aria-labelledby="r-slider"
              orientation="vertical"
              value={red} step={0.001} min={0.0} max={1.0}
              onChange={(e, val) => setRed(val)} onChangeCommitted={sendRGBW}/>
              <Typography id="g-slider" gutterBottom>G</Typography>
              <Slider
              aria-labelledby="g-slider"
              orientation="vertical"
              value={green} step={0.001} min={0.0} max={1.0}
              onChange={(e, val) => setGreen(val)} onChangeCommitted={sendRGBW}/>
              <Typography id="b-slider" gutterBottom>B</Typography>
              <Slider
              aria-labelledby="b-slider"
              orientation="vertical"
              value={blue} step={0.001} min={0.0} max={1.0}
              onChange={(e, val) => setBlue(val)} onChangeCommitted={sendRGBW}/>
              <Typography id="w-slider" gutterBottom>W</Typography>
              <Slider
              aria-labelledby="w-slider"
              orientation="vertical"
              value={white} step={0.001} min={0.0} max={1.0}
              onChange={(e, val) => setWhite(val)} onChangeCommitted={sendRGBW}/>
            </Stack>
          </TabPanel>
        </TabContext>
    </Box>
    <Box component="span" >
      <Typography id="t-slider" gutterBottom>Interp</Typography>
      <Slider
      aria-labelledby="t-slider"
      value={time} step={0.001} min={0.0} max={20.0}
      onChange={(e, val) => setTime(val)} onChangeCommitted={sendTime}/>
    </Box>
  
  </React.Fragment>
}

//export default Fill;
