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
  import Post from './../components/post.js';


  class FeedContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }


    render (){
      return(
      // <div id='feedContainer'>
      //   <Post />
      // </div>
      <Container>
        <Post />
      </Container>
      )
    }
  }

export default FeedContainer;