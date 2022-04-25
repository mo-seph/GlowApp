import '../App.css';
import {  Box, Slider, Typography, Stack, Tab} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import React, {useState, useEffect } from "react"
import { RGBWInterface, HSVInterface,HSlider } from '../UIElements';
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
    {HSlider("interp-slider","Fade",time,setTime,sendTime,0.0,20.0)}
  </React.Fragment>
}

//export default Fill;
