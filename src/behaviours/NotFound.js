
import '../App.css';
import {WrapUI} from '../MyStyles'

import React from "react"


export default (props) => {
  const ui = <React.Fragment>Unknown </React.Fragment>;
  return ( WrapUI(ui,props.block.behaviour,props.block.id) );
}
