import '../App.css';
import {  Box, Slider, Typography, Stack, Tab} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import React, {useState, useEffect } from "react"
import { RGBWInterface, HSVInterface } from '../UIElements';
import { propsToClassKey } from '@mui/styles';


export default (props) => {
  const data = props['block']['data'] || {}

  const [time, setTime] = useState(data['time'] || 0.0)

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => { setValue(newValue); };

  useEffect(() => {
    setTime(data['time'])
  },[data['time']])

  const sendTime = () => {
    props.callbacks.sendData(props,{ time:time });
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
            <HSVInterface data={data} callbacks={props.callbacks} parent={props}/> 
          </TabPanel>
          <TabPanel value="2">
            <RGBWInterface data={data} callbacks={props.callbacks} parent={props}/> 
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
