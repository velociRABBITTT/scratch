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
      this.state = {
        createPost: false,
      };

      this.createPostOnClick = this.createPostOnClick.bind(this);
      this.submitNewPost = this.submitNewPost.bind(this);

    }

    createPostOnClick() {
      this.setState({ createPost: true })
    }

    async submitNewPost() {
      const newTitle = await document.getElementById('pTitle').value;
      const newGoal = await document.getElementById('pGoal').value;
      const newMethod = await document.getElementById('pMethod').value;
      const newDuration = await document.getElementById('pDuration').value;
      const newResults = await document.getElementById('pResults').value;
      const newAuthor = this.props.AppState.user.username;
      let newDate = new Date();
      newDate = newDate.toTimeString()
      const body = await {
        title: newTitle,
        goal: newGoal,
        method: newMethod,
        duration: newDuration,
        results: newResults,
        author: newAuthor,
        created: newDate
      }

      await fetch('/createPost', {
        method: 'POST',
        headers: {'Content-Type': 'Application/JSON'},
        body: JSON.stringify(body)
        
      }).then((data)=>{
        console.log("successful post", data)
        this.setState({createPost: false});
        this.props.update();
      }).catch((err)=>{
        console.log("Something wrong ", err);
      })
    }



    render(){

      if (!this.state.createPost){
      return(
        <div className="topnav">
        <a className="active" href="#home">Home</a>
        {/* <input id='createPost' type="text" placeholder="create post"></input> */}
        <Button color="default" className='createPost' fullWidth variant="contained" size='small' onClick={this.createPostOnClick}>Create Post</Button>
      </div>
      )
    }

    if (this.state.createPost){
      return (
        <div className="topnav">
        <a className="active" href="#home">Home</a>
        {/* <input id='createPost' type="text" placeholder="create post"></input> */}
        <form>
          <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField id='pTitle' fullWidth label='Title' name='Title' size='small' variant='outlined' />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField id='pGoal' fullWidth label="Goal" name="Goal" size="small" variant="outlined" />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id='pMethod'
                          fullWidth
                          label="Method"
                          name="Method"
                          size="small"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField 
                        fullWidth
                        id='pDuration'
                        label='Duration'
                        name='Duration'
                        size='small'
                        variant='outlined'
                        
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id='pResults'
                          fullWidth
                          label="Results"
                          name="Results"
                          size="small"
                          variant="outlined"
                        />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button color="primary" className='submitPost' fullWidth variant="contained" onClick={this.submitNewPost}>
                      Submit New Post
                    </Button>
                  </Grid>
                </Grid>
             </Grid>
        </form>
      </div>
      
      ) 
    }

  }
  }

  export default NavBar;