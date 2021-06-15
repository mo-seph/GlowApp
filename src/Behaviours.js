import React from "react";
import Fill from "./behaviours/Fill";
import Watchdog from "./behaviours/Watchdog";
import NotFound from "./behaviours/NotFound";
import GlowBall from "./behaviours/GlowBall";
import PixelClock from "./behaviours/PixelClock";
import Alarm from "./behaviours/Alarm";

const Behaviours = {
  Fill: Fill,
  Glow: GlowBall,
  Watchdog: Watchdog,
  PixelClock: PixelClock,
  Alarms: Alarm
};

export default (block,callbacks) => {
  if( ! block ) return <></>;
  console.log("Got block: "+JSON.stringify(block))
  const name = block.type;
  var cls = Behaviours[name] || NotFound
  // component does exist
    const elem = React.createElement(cls, {
      key: block.id,
      block: block,
      callbacks:callbacks
    });
    return elem
}
