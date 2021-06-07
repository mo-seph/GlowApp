import React from "react";
import Fill from "./behaviours/Fill";
import Watchdog from "./behaviours/Watchdog";
import NotFound from "./behaviours/NotFound";
import GlowBall from "./behaviours/GlowBall";
import PixelClock from "./behaviours/PixelClock";

const Behaviours = {
  Fill: Fill,
  Glow: GlowBall,
  Watchdog: Watchdog,
  PixelClock: PixelClock
};

export default (block,callbacks) => {
  if( ! block ) return <></>;
  console.log("Got block: "+JSON.stringify(block))
  const name = block.type;
  var cls = Behaviours[name] || NotFound
  // component does exist
    const elem = React.createElement(cls, {
      key: block._uid,
      block: block,
      callbacks:callbacks
    });
    return <div>
    {elem}
    </div>
}
