//import '../App.css';
import {  Box, Slider, Typography, Stack, Tab} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import React, {useState, useEffect } from "react"

const ident = (x)=>{return x}

export const VSlider = (id,label,value,onChange,onCommit,min=0.0,max=1.0,step=0.01) => {

    return <Stack direction="column">
        <Slider
        aria-labelledby={id}
        size="small"
        valueLabelDisplay="on"
        orientation="vertical"
        value={value} step={step} min={min} max={max}
        onChange={(e, val) => onChange(val)} onChangeCommitted={onCommit}/>
        <Typography id={id} gutterBottom>{label}</Typography>
    </Stack>
}


export const RGBWInterface = (props) => {
    const data = props['data']
    const [red, setRed] = useState(data['r'] || 0.0)
    const [green, setGreen] = useState(data['g'] || 0.0)
    const [blue, setBlue] = useState(data['b'] || 0.0)
    const [white, setWhite] = useState(data['w'] || 0.0)

    useEffect(() => {
        setRed(data['r'])
        setGreen(data['g'])
        setBlue(data['b'])
        setWhite(data['w'])
      },[data['r'],data['g'],data['b'],data['w']])
    const sendRGBW = () => {
        props.callbacks.sendData(props.parent,{ r: red, g: green, b: blue, w: white});
    }

    const scaleVal = (v) => {return v**2.3};
    return <>
        <Stack sx={{ height: 200 }} spacing={1} direction="row">
        {VSlider("r-slider","R",red,setRed,sendRGBW,0.0,1.0,0.001)}
        {VSlider("g-slider","G",green,setGreen,sendRGBW,0.0,1.0,0.001)}
        {VSlider("b-slider","B",blue,setBlue,sendRGBW,0.0,1.0,0.001)}
        {VSlider("w-slider","W",white,setWhite,sendRGBW,0.0,1.0,0.001)}
        </Stack>
    </>
}


export const HSVInterface = (props) => {
    const data = props['data']
    const [hue, setHue] = useState(data['h'] || 0.0)
    const [saturation, setSaturation] = useState(data['s'] || 0.0)
    const [intensity, setIntensity] = useState(data['v'] || 0.0)

    useEffect(() => {
        setHue(data['h'])
        setSaturation(data['s'])
        setIntensity(data['v'])
      },[data['h'],data['s'],data['v']])

    const sendHSV = () => {
        props.callbacks.sendData(props.parent,{ h: hue, s: saturation, v: intensity});
    }
    return <>
    <Stack sx={{ height: 200 }} spacing={1} direction="row">
        {VSlider("h-slider","H",hue,setHue,sendHSV,0.0,360.0,0.5)}
        {VSlider("s-slider","S",saturation,setSaturation,sendHSV,0.0,1.0,0.01)}
        {VSlider("v-slider","V",intensity,setIntensity,sendHSV,0.0,0.0,0.01)}
    </Stack>
    </>
}

export default RGBWInterface