import logo from './logo.svg';
import './App.css';
import { Button, Box, Slider, Typography } from '@material-ui/core';
import React, {useState, useEffect } from "react"

import Behaviours from "./Behaviours";

import mqtt from 'mqtt'
const client = mqtt.connect("mqtt://192.168.178.131:9001");


const data = {
  behaviours:[
    {
      id: 0,
      behaviour:"Fill",
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
      behaviour:"Something else",
      data: {
        "length":1.0
      }
    },
    {
      id: 16,
      behaviour:"Watchdog",
      data: {
        "length":1.0
      }
    }
  ]
}

const App = () => {
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [messages, setMessages] = useState([]);

  const publish = (d) => {
    console.log("Printing data...: " + d);
    client.publish('leds', JSON.stringify(d))
  }

  const sendFrom = (props,data) => {
    console.log("Printing data from [" + props.block.id + "] " + JSON.stringify(data));
    const packet = {
      update:props.block.id,
      data:data
    };
    const packet_s =JSON.stringify(packet)
    console.log("Became: " + packet_s );
    client.publish('leds', packet_s)
  }

  const functions = {
    send: sendFrom
  }

  return (
    <div className="App">
      {data.behaviours.map(behaviour => Behaviours(behaviour,functions))}
    </div>
  );
}

export default App;
