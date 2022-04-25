import '../App.css';
import { Button, Box, Slider, Typography,Container,Paper,Card,CardContent } from '@mui/material';

import React, {useState, useEffect } from "react"
import { RGBWInterface, HSlider } from '../UIElements';

export default (props) => {
  const data = props['block']['data'] || {}
  const [rate, setRate] = useState(data['rate'] || 0.0)
  const [width, setWidth] = useState(data['rate'] || 0.0)

  useEffect(() => {
    setRate(data['rate'])
    setWidth(data['width'])
  },[data['width'],data['rate']])

  const send = () => {
    props.callbacks.sendData(props,{  rate:rate, width:width });
  }

  return <React.Fragment>
    <RGBWInterface data={data} callbacks={props.callbacks} parent={props}/> 
    {HSlider("rate-slider","Rate",rate,setRate,send)}
    {HSlider("width-slider","Width",width,setWidth,send,0.0,0.3)}
  </React.Fragment>
}

//export default Fill;
