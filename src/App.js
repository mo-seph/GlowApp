import './App.css';
import { AppBar, Stack, Typography } from '@mui/material';
import React, {useState, useEffect, useCallback } from "react"
import { ConnectedDisplay, PingButton } from './ConnectionElements';
import { DeviceHeader, DeviceBody, DeviceSelector } from "./Device";
import { useTheme } from '@mui/material/styles';

import mqtt from 'mqtt'


const user_device = JSON.parse(localStorage.getItem('user_default_device')||'{"device":"none"}')['device']
console.log("Set user device: ",user_device)

const App = () => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [connectionStatus, setConnectionStatus] = useState(false);
  const [client_r, setClient] = useState();
  //const [functions, setFunctions] = useState({});
  const [devices, setDevices] = useState({});//default_devices);
  const [deviceState, setDeviceState] = useState({});
  const [currentDevice, setCurrentDevice] = useState(null);
  const [userSelectedDevice, setUserSelectedDevice] = useState(false);
  var safe_client = null;

  useEffect(() => {
    console.log("---------\nStarting MQTT\n---------")
    //const client = mqtt.connect("mqtt://glowserver.local:9001");
    //const client = mqtt.connect("mqtt://192.168.178.108:9001");
    var host = window.location.hostname;
    if( host === "localhost") { host = "moominpappa.local"}
    console.log("Host: ",host)
    const client = mqtt.connect("mqtt://" + host + ":9001");
    safe_client = client
    //setClient(client);
    console.log("Client set to: ",client_r)
    //const client = mqtt.connect("mqtt://moominpappa.local:9001");
    //const client = mqtt.connect("mqtt://localhost:9001");
    client.on('connect', () => {
      setConnectionStatus(true)
      client.subscribe("leds/+/state")
      client.subscribe("leds/ping_response")
      console.log("Connected!")
      client.publish('leds/ping_request', JSON.stringify({"ping":1}))
    });
    client.on('message', (topic, payload, packet) => {
      console.log("Message! "+payload + "  on " + topic)
      const id_match = topic.match(/leds\/(.*)\/state/);
      if( id_match ) {
        const device_id = id_match[1];
        //console.log("Got message from: " + device_id)
        try {
          var data = JSON.parse(payload.toString())
          deviceState[device_id] = data['state'];
          setDeviceState(deviceState);
        }
        catch( err ) {
          console.log("Couldn't set data from document")
          console.log(payload.toString())
        }
      }
      else if( topic === "leds/ping_response") {
        var data = JSON.parse(payload.toString())
        devices[data["id"]] = data;
        setDevices(devices);
        console.log("Got device: ",data["id"])
        if( ! userSelectedDevice ) {
          //console.log("We do not have user selected device", data)
          const matches = data["id"] === user_device 
          if( matches ) {
            //console.log("Found matching device", data)
            set_selected_device(get_device_data(data["id"]), true)
          }
          else if(! currentDevice ) {
            //console.log("No device set, so setting a non-user selected one")
            set_selected_device(get_device_data(data["id"]), false)
          } else {
            //console.log("Got a current device, so not replacing it")
          }
        }
        else {
          //console.log("Not setting device as it's already user selected", data)
        }
      }
      else {
        console.log("Unknown message: " + payload.toString())
      }
      forceUpdate();
    });

    setClient(client)
    return function cleanup() {
      console.log("Closing client")
      client.end()
    }
  },[]);

  const sendCommand = (device)=>(d) => {
    console.log("Sending command to ["+ device.mqtt_commands +"] " + JSON.stringify(d));
    if( client_r ) { client_r.publish(device.mqtt_commands, JSON.stringify(d)) }
    else if( safe_client ) { safe_client.publish(device.mqtt_commands, JSON.stringify(d)) }
    else {console.error("No clients set!")}
  }
  const ping = () => {
    console.log("Sending ping request" );
    client_r.publish("leds/ping_request", JSON.stringify({ping:1}))
  }

  const sendData = (device)=>(props,data) => {
    //console.log("Printing data from [" + props.block.id + "] " + JSON.stringify(data));
    const packet = {
      update:props.block.id,
      data:data
    };
    const packet_s =JSON.stringify(packet)
    //console.log("Became: " + packet_s );
    client_r.publish(device.mqtt_commands, packet_s)
  }
  const funcs =  {
    sendData: sendData,
    sendCommand: sendCommand,
    ping: ping
  }

  //const useStyles = makeStyles(MyStyles);
  //const classes = useStyles();

  const get_device_data = (k) => {return({device: devices[k], state: deviceState[k] })}
  const device_data = Object.keys(devices).map(
    (k) => {return({device: devices[k], state: deviceState[k] })}
  )
  //const device_to_name = (v)=>v.device.name
  //const device_to_content = (v)=><Device device={v.device} state={v.state} functions={funcs} />
  const set_selected_device = (v,user_selected=true) => {
    console.log("Selected device: ",v)
    sendCommand(v.device)({state:1})
    setCurrentDevice(v.device)
    if( user_selected ) {
      setUserSelectedDevice(true);
      localStorage.setItem('user_default_device',JSON.stringify({device:v.device.id}))
    }
    //console.log("On Change: " + JSON.stringify(v))
  }

  const theme = useTheme()
  return (
    <div className="App">
      <AppBar position="static" sx={{bgcolor: theme.palette.primary.light}}>

    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <ConnectedDisplay connectionStatus={connectionStatus}/>
      <Typography variant="h5"> Glow App </Typography>
        <PingButton ping={ping}/>
    </Stack>
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <DeviceSelector items={device_data} onSelect={set_selected_device} />
      <DeviceHeader device={currentDevice} functions={funcs}/>
    </Stack>
      </AppBar>
    <DeviceBody device={currentDevice} states={device_data} functions={funcs}/>
    </div>
  );
}
  

export default App;
