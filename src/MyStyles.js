import { Button, Box, Slider, Typography,Container,Paper,Card,CardContent,CardHeader,FormControlLabel,Switch,Grid } from '@material-ui/core';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import BrushIcon from '@material-ui/icons/Brush';

import React, {useState, useEffect } from "react"

const MyStyles = {
  root: {
    //height: 300,
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //width:400,
  },
  sliderGroup: {
    height:200,
  },
  card: {
    width:380,
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    },
    margin: "20px"
  },
  device_card: {
    width:440,
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    },
    margin: "20px"
  },
  cardContent: {
    background: "#eee"
  },
  cardHeader: {
    background: 'linear-gradient(to bottom, #ddd, #ccc)',
    textAlign: 'left'
  }
};

export default MyStyles
