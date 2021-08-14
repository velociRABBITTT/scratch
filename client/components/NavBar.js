import React, { Component } from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
  } from "@material-ui/core";
  import { StylesProvider } from '@material-ui/core/styles';

  class NavBar extends Component {
    constructor(props){
      super(props);
      this.state = {};
    }



    render(){
      return(
        <div class="topnav">
        <a class="active" href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
        {/* <input type="text" placeholder="Search.."></input> */}
      </div>
      )
    }
  }

  export default NavBar;