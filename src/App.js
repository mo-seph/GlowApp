import './App.css';
import { Button, Card, CardHeader, FormControlLabel, Switch } from '@material-ui/core';
import React, {useState, useEffect, useCallback } from "react"
import { makeStyles } from '@material-ui/core/styles';
import MyStyles from './MyStyles'

import Device from "./Device";
import MyTabs from "./MyTabs";

import mqtt from 'mqtt'

const default_state = {
  living_d:[
    {
      id: 0,
      type:"Fill",
      active:true,
      data: {
        "r":0.1,
        "g":0.4,
        "b":0.8,
        "w":0.2,
        "time":1.0
      }
    },
    {
      id:2,
      type:"PixelClock",
      active:true,
      name:"Time"
    },


    {
      id: 4,
      type:"Alarms",
      active:true,
      data: {
        "start":20,
        "length":10,
        "time":5
      }
    },
    {
      id: 16,
      type:"Watchdog",
      active:true,
      data: {
        "length":1.0
      }
    }
  ],
  living:[
    {
      id: 0,
      type:"Fill",
      active:true,
      data: {
        "r":0.1,
        "g":0.4,
        "b":0.8,
        "w":0.2,
        "time":1.0
      }
    }
  ]
}

const default_devices = {
  //living_d:{id:"living_d",name:"Living Room Default","ip":"192.168.0.0","mqtt_commands":"leds/default/commands","mqtt_state":"leds/default/state"},
  //living:{"id":"living","name":"Living Room Initial","ip":"192.168.178.229","mqtt_commands":"leds/living/commands","mqtt_state":"leds/living/state"},
}

const App = () => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [connectionStatus, setConnectionStatus] = useState(false);
  const [client, setClient] = useState();
  const [functions, setFunctions] = useState({});
  const [devices, setDevices] = useState(default_devices);
  const [deviceState, setDeviceState] = useState({});


  useEffect(() => {
    console.log("---------\nStarting MQTT\n---------")
    //const client = mqtt.connect("mqtt://glowserver.local:9001");
    const client = mqtt.connect("mqtt://192.168.178.108:9001");
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
        //console.log("Message! "+payload + "  on " + topic)
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
        else if( topic == "leds/ping_response") {
          var data = JSON.parse(payload.toString())
          devices[data["id"]] = data;
          setDevices(devices);
          //console.log("Setting devices: " + JSON.stringify(devices))
        }
        else {
          console.log("Unknown message: " + payload.toString())
        }
        forceUpdate();
      });
      setClient(client);


      return function cleanup() {
        console.log("Closing client")
        client.end()
      }
  },[]);

  const sendCommand = (device)=>(d) => {
    console.log("Sending command to ["+ device.mqtt_commands +"] " + JSON.stringify(d));
    client.publish(device.mqtt_commands, JSON.stringify(d))
  }
  const ping = () => {
    console.log("Sending ping request" );
    client.publish("leds/ping_request", JSON.stringify({ping:1}))
  }

  const sendData = (device)=>(props,data) => {
    //console.log("Printing data from [" + props.block.id + "] " + JSON.stringify(data));
    const packet = {
      update:props.block.id,
      data:data
    };
    const packet_s =JSON.stringify(packet)
    //console.log("Became: " + packet_s );
    client.publish(device.mqtt_commands, packet_s)
  }
  const funcs =  {
    sendData: sendData,
    sendCommand: sendCommand,
    ping: ping
  }

  const useStyles = makeStyles(MyStyles);
  const classes = useStyles();

  const device_data = Object.keys(devices).map(
    (k) => {return({device: devices[k], state: deviceState[k] })}
  )
  const device_to_name = (v)=>v.device.name
  const device_to_content = (v)=><Device device={v.device} state={v.state} functions={funcs} />
  const on_select = (v) => {
    sendCommand(v.device)({state:1})
    console.log("On Change: " + JSON.stringify(v))
  }

  console.log("Redrawing!")
  return (
    <div className="App">
    <Card className={classes.card} key="header">
    <CardHeader
      action={
        <>
        <FormControlLabel
          label="Connected"
          control={
            <>
            <Switch
              checked={connectionStatus || false}
              name="connected" color="secondary"
            />

            </>
        }
        />
        <Button variant="contained" color="primary"
          onClick={() => { ping() }} >
          Ping
        </Button>
        </>
      }
      title="Glow App"
      style={MyStyles.cardHeader}
    />
    </Card>
    <MyTabs
      items={device_data}
      toLabel={device_to_name}
      toContent={device_to_content}
      onSelect={on_select} />
    </div>
  );
}
/*

  */

/*
{Object.keys(devices).map( (v)=>JSON.stringify(devices[v]) )}
*/

/*
{Object.keys(devices).map(
  (v)=>Device({device:devices[v],state:deviceState[v]},funcs) )}
  */

/*
{MyTabs(
  Object.keys(devices).map(
    (k) => {return({device: devices[k], state: deviceState[k] })}
  ),
  (v)=>v.device.name,
  (v)=>Device({"device":v.device,"state":v.state},funcs) )}
*/

export default App;
