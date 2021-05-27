import logo from './logo.svg';
import './App.css';
import { Button, Box, Slider, Typography, Card, CardHeader, FormControlLabel, Switch} from '@material-ui/core';
import React, {useState, useEffect } from "react"
import { makeStyles,withStyles } from '@material-ui/core/styles';
import MyStyles,{WrapUI} from './MyStyles'


import Behaviours from "./Behaviours";

import mqtt from 'mqtt'

const default_data = {
  behaviours:[
    {
      id: 0,
      type:"Fill",
      active:true,
      data: {
        "r":0.3,
        "g":0.4,
        "b":0.8,
        "w":0.2,
        "time":1.0
      }
    },
    {
      id: 4,
      type:"Something else",
      active:false,
      data: {
        "length":1.0
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
  ]
}

const App = () => {

  const [connectionStatus, setConnectionStatus] = useState(false);
  const [messages, setMessages] = useState([]);
  const [behaviours, setBehaviours] = useState([]);
  //const [behaviours, setBehaviours] = useState(default_data.behaviours);
  const [client, setClient] = useState();
  const [functions, setFunctions] = useState({});


  useEffect(() => {
    //const client = mqtt.connect("mqtt://glowserver.local:9001");
    const client = mqtt.connect("mqtt://192.168.178.123:9001");
      client.on('connect', () => {
        setConnectionStatus(true)
        client.subscribe("leds/+")
        console.log("Connected!")
        client.publish('leds/commands', JSON.stringify({"state":1}))
      });
      client.on('message', (topic, payload, packet) => {
        //console.log("Message! "+payload + "  on " + topic)
        if( topic == "leds/state") {
          var blocks = JSON.parse(payload.toString())
          blocks.forEach( (value,i) => {
            if(value) value["id"] = i} )
          setBehaviours(blocks)
        }
        //setMessages(messages.concat(payload.toString()));
      });
      setClient(client);
      const sendCommand = (d) => {
        console.log("Sending command " + JSON.stringify(d));
        client.publish('leds/commands', JSON.stringify(d))
      }

      const sendData = (props,data) => {
        console.log("Printing data from [" + props.block.id + "] " + JSON.stringify(data));
        const packet = {
          update:props.block.id,
          data:data
        };
        const packet_s =JSON.stringify(packet)
        console.log("Became: " + packet_s );
        client.publish('leds/commands', packet_s)
      }
      setFunctions( {
        sendData: sendData,
        sendCommand: sendCommand
      } )

      return function cleanup() {
        console.log("Closing client")
        client.end()
      }
  },[]);



  const useStyles = makeStyles(MyStyles);
  const classes = useStyles();

  return (
    <div className="App">
    <Card className={classes.card} key="header">
    <CardHeader
      action={
        <FormControlLabel
          label="Connected"
          control={
            <Switch
              checked={connectionStatus || false}
              name="connected" color="secondary"
            />
        } />
      }
      title="Glow App"
      style={MyStyles.cardHeader}
    />

    </Card>
    {behaviours.map(behaviour => Behaviours(behaviour,functions))}

    </div>
  );
}

export default App;
