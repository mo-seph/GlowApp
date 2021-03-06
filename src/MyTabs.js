import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
  },
}));

export default (props) => {
  const items = props.items;
  const toLabel = props.toLabel;
  const toContent = props.toContent;
  const onSelect = props.onSelect;
  const classes = useStyles();
  const [value, setValue] = React.useState(props.defaultTab || 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onSelect(items[newValue])
  };

  return (
    <>
    <div className={classes.root} key="tabs">
    <AppBar position="static">
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
    {items.map((v,i)=> <Tab label={toLabel(v)} key={i} {...a11yProps(i)} /> )}
      </Tabs>
    </AppBar>
    {items.map((v,i)=>
      <TabPanel value={value} index={i} key={i}>
        { toContent(v) }
      </TabPanel>
    )}
    </div>
    </>

  );
}
