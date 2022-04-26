//import '../App.css';
import {  Box, Slider, Typography, Stack, Tab} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import React, {useState, useEffect } from "react"

const ident = (x)=>{return x}

export const VSlider = (id,label,value,onChange,onCommit,min=0.0,max=1.0,step=0.01) => {

    return LabelVSlider(id,label,
        DefaultVSlider(id,value,onChange,onCommit,min,max,step)
        )
}

export const LabelVSlider = (id,label,slider) => {
    return <Stack direction="column">    
        {slider}
        <Typography id={id} gutterBottom>{label}</Typography>
    </Stack>
}

export const DefaultVSlider = (id,value,onChange,onCommit,min=0.0,max=1.0,step=0.01) => {
    return        <Slider
    aria-labelledby={id}
    size="small"
    orientation="vertical"
    value={value} step={step} min={min} max={max}
    onChange={(e, val) => onChange(val)} onChangeCommitted={onCommit}/>
}

export const HSlider = (id,label,value,onChange,onCommit,min=0.0,max=1.0,step=0.01) => {
    return LabelHSlider(id,label,
        <Slider
        aria-labelledby={id}
        size="small"
        value={value} step={step} min={min} max={max}
        onChange={(e, val) => onChange(val)} onChangeCommitted={onCommit}/>
        )
}

export const LabelHSlider = (id,label,slider) => {
    return <Stack direction="row">
    <Typography sx={{width:100}} id={id}>{label}</Typography>
    {slider}
    </Stack> 
}


export const RGBWInterface = (props) => {
    const data = props['data']
    const [red, setRed] = useState(data['r'] || 0.0)
    const [green, setGreen] = useState(data['g'] || 0.0)
    const [blue, setBlue] = useState(data['b'] || 0.0)
    const [white, setWhite] = useState(data['w'] || 0.0)
    console.log(data)

    useEffect(() => {
        setRed(data['r'])
        setGreen(data['g'])
        setBlue(data['b'])
        setWhite(data['w'])
      },[data['r'],data['g'],data['b'],data['w']])
    const sendRGBW = () => {
        console.log("Sending: ")
        console.log({ r: red, g: green, b: blue, w: white})
        props.callbacks.sendData(props.parent,{ r: red, g: green, b: blue, w: white});
    }
    const pow = 2.3
    const wrapSet = (f) =>{return (v)=>{f(v**pow)}}
    const toSlider = (v) =>{return Math.pow(v,1/pow)}
    const fromSlider = (v) =>{return v**pow}

    const scaleVal = (v) => {return v**2.3};
    return <>
        <Stack sx={{ height: 200 }} spacing={1} direction="row" justifyContent="space-evenly">
        {VSlider("r-slider","R",toSlider(red),wrapSet(setRed),sendRGBW,0.0,1.0,0.001)}
        {VSlider("g-slider","G",toSlider(green),wrapSet(setGreen),sendRGBW,0.0,1.0,0.001)}
        {VSlider("b-slider","B",toSlider(blue),wrapSet(setBlue),sendRGBW,0.0,1.0,0.001)}
        {VSlider("w-slider","W",toSlider(white),wrapSet(setWhite),sendRGBW,0.0,1.0,0.001)}
        </Stack>
    </>
}


export const HSVInterface = (props) => {
    const data = props['data']
    console.log(data)
    const [hue, setHue] = useState(data['h'] || 0.0)
    const [saturation, setSaturation] = useState(data['s'] || 0.0)
    const [intensity, setIntensity] = useState(data['v'] || 0.0)

    useEffect(() => {
        setHue(data['h'])
        setSaturation(data['s'])
        setIntensity(data['v'])
      },[data['h'],data['s'],data['v']])

    const sendHSV = () => {
        console.log("Sending: ")
        console.log({ h: hue, s: saturation, v: intensity})
        props.callbacks.sendData(props.parent,{ h: hue, s: saturation, v: intensity});
    }
    return <>
    <Stack sx={{ height: 200 }} spacing={1} direction="row" justifyContent="space-evenly">
        {LabelVSlider("h-slider","H",
            <Box sx={{height:"100%", 
                background:'linear-gradient(to top, hsla(0, 100%, 50%) 0%, hsl(60, 100%, 50%) 17%, hsl(120, 100%, 50%) 33%, hsl(180, 100%, 50%) 50%, hsl(240, 100%, 50%) 66%, hsl(320, 100%, 50%) 83%, hsl(360, 100%, 50%) 100%)'}}>
            {DefaultVSlider("h-slider",hue,setHue,sendHSV,0.0,360.0,0.5)}
            </Box>
        )}
        {VSlider("s-slider","S",saturation,setSaturation,sendHSV,0.0,1.0,0.01)}
        {VSlider("v-slider","V",intensity,setIntensity,sendHSV,0.0,1.0,0.01)}
    </Stack>
    </>
}

export default RGBWInterface