import React from "react";
import Fill from "./behaviours/Fill";
import Watchdog from "./behaviours/Watchdog";
import NotFound from "./behaviours/NotFound";

const Behaviours = {
  Fill: Fill,
  Watchdog: Watchdog
};

export default (block,callbacks) => {
  const name = block.behaviour;
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
