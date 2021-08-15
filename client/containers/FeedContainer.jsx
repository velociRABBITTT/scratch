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

      console.log(this.props.AppState.feed)

      const feedArr = [];

      this.props.AppState.feed.forEach((el,ind) => {
        feedArr.push(<Post 
          appState={this.props.AppState}
          key={ind}
          postProps={el} 
          update={this.props.update}
          />)
      })


      return(
      // <div id='feedContainer'>
      //   <Post />
      // </div>
      <Container maxWidth='md'> 
        {feedArr}
        </Container>
      )
    }
  }

export default FeedContainer;