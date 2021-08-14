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


  class Post extends Component {
    constructor(props) {
      super(props);
    }

    render () {
      return (
      <div className='post'>
        <p>This is a test post designed for test purposes</p>
        <p>This is a test</p>
        <p>This is a test</p>
        <p>This is a test</p>
        <p>This is a test</p>
        <p>This is a test</p>
      </div>
      )
    }
      
  }

  export default Post;