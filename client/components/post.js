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

        // postSchema = new Schema({
        //   goal: { type: String, required: true },
        //   method: { type: String },
        //   duration: { type: String },
        //   results: { type: String },
        //   author: { type: String },
        //   created: { type: String }
        // });
        
      <div className='post'>
       
        <p><b>{this.props.postProps.title}</b></p>
        <p><b>Goal: </b> {' ' + this.props.postProps.goal}</p>
        <p>Method: {' ' + this.props.postProps.method}</p>
        <p>Duration: {' ' + this.props.postProps.duration}</p>
        <p>Author {' ' + this.props.postProps.author}</p>
        <p>Created by: {' ' + this.props.postProps.created}</p>
      </div>
      )
    }
      
  }

  export default Post;