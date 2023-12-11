import { Button, FormControlLabel, Checkbox, IconButton } from "@mui/material"
import { CloudDone, CloudOff, Radar } from "@mui/icons-material"


export const ConnectedDisplay = (props) => {
  return <Checkbox icon={<CloudOff />} checkedIcon={<CloudDone />}
    checked={props.connectionStatus || false}
    name="connected" 
  />
}

export const PingButton = (props) => {
  const func = props.ping
  return <><IconButton variant="contained" color="primary" 
    onClick={() => { func() }} >
  <Radar/>
  </IconButton>
  </>
}

export default PingButton