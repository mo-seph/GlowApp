import './App.css';
import { Typography, IconButton, Stack, MenuItem, Menu } from '@mui/material';
import Behaviour from "./Behaviour";
import RefreshIcon from '@mui/icons-material/Refresh';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';


import React, {useState,useEffect} from "react"

export const DeviceSelector = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const items = props.items;
  const openMenu = (event) => { setAnchorEl(event.currentTarget); };
  const closeMenu = () => {
      setAnchorEl(null);
  }
  const setSelectedDevice = (v) => {
      props.onSelect(v);
      closeMenu();
  }
  return <>
  <IconButton id="device-select" onClick={openMenu}>
      <DynamicFeedIcon/>
  </IconButton>
  <Menu open={menuOpen} onClose={closeMenu}   anchorEl={anchorEl}>
  {items.map((v,i)=> 
      <MenuItem onClick={(e) => setSelectedDevice(v)} key={i}>{v.device.name}</MenuItem>
  )}
  </Menu>

  </>
}

export const DeviceHeader = (props) => {
  const info = props.device;
  const getState = () => { props.functions.sendCommand(props.device)({state:1}) }
  const name = info ? info.name : "Not set"
  const id = info ? `(${info.id})` : "."
  const ready = info ? true : false
  return <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexGrow: 1}}>
    <Stack direction="column" sx={{ flexGrow: 1}}>
    <Typography align="left" variant="h6">{name}</Typography>
    <Typography align="left" variant="subtitle2">{id}</Typography>
    </Stack>
    <IconButton color="primary" onClick={getState}><RefreshIcon/></IconButton>
  </Stack>
}

export const DeviceBody = (props) => {
  //const behaviours = props['state'] || []
  const device = props['device'] 
  const currentState = device ? props.states.find((s)=>{return s.device.id === device.id}) : []
  const behaviours = currentState.state || []

  const functions = {
    sendData : props.functions.sendData(device),
    sendCommand : props.functions.sendCommand(device),
  }
  return(
  <>
  {behaviours.map((behaviour,i) => <Behaviour block={behaviour} functions={functions} key={i}/>)}
  </>
)
}


//export default Fill;
