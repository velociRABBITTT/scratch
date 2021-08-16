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
  import { StylesProvider, styled } from '@material-ui/core/styles';
  import Post from './../components/post.js';


  const AllPostsContainer = styled(Container)({
    //background: 'rgba(70, 70, 70, 0.7)',
    marginTop: '120px',
    

  })

  class FeedContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    render (){

      console.log(this.props.AppState.feed)

      const feedArr = [];

      this.props.AppState.feed.reverse().forEach((el,ind) => {
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
      <AllPostsContainer id='feed' maxWidth='md'> 
        {feedArr}
        </AllPostsContainer >
      // </div>
      )
    }
  }

export default FeedContainer;