


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