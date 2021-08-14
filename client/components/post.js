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
      this.state = {
        editForm: false,
        targetId: undefined
      }
      this.editPost = this.editPost.bind(this);
      this.changeToEdit = this.changeToEdit.bind(this);
    }

    async editPost(e) {
      
      console.log(e.target.value)
      const newTitle = await document.getElementById('eTitle').value;
      const newGoal = await document.getElementById('eGoal').value;
      const newMethod = await document.getElementById('eMethod').value;
      const newDuration = await document.getElementById('eDuration').value;
      const newResults = await document.getElementById('eResults').value;
      const newAuthor = this.props.appState.user.username;
      let newDate = new Date();
      newDate = newDate.toTimeString()
      const body = await {
        id: this.state.targetId,
        title: newTitle,
        goal: newGoal,
        method: newMethod,
        duration: newDuration,
        results: newResults,
        author: newAuthor,
        created: newDate
      }

      fetch('/editPost', {
        method: 'POST',
        headers: {'Content-Type':'Application/JSON'},
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(arr => {
      //console.log(arr)
      this.setState({editForm: false, targetId: undefined})
      this.props.update();

    })
    }

    changeToEdit(e) {
      const targetId = e.target.value;
      this.setState({ editForm: true, targetId: targetId })
    }

    render () {

      
      const editForm = (
        <form>
          <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField id='eTitle' fullWidth label='Title' name='Title' size='small' variant='outlined' defaultValue= {this.props.postProps.title} /> 
                      </Grid>
                      <Grid item xs={12}>
                        <TextField id='eGoal' fullWidth label="Goal" name="Goal" size="small" variant="outlined" defaultValue= {this.props.postProps.goal}/>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          defaultValue={this.props.postProps.method}
                          id='eMethod'
                          fullWidth
                          label="Method"
                          name="Method"
                          size="small"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField 
                        defaultValue={this.props.postProps.duration}
                        fullWidth
                        id='eDuration'
                        label='Duration'
                        name='Duration'
                        size='small'
                        variant='outlined'
                        
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          defaultValue={this.props.postProps.results}
                          id='eResults'
                          fullWidth
                          label="Results"
                          name="Results"
                          size="small"
                          variant="outlined"
                        />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button color="primary" className='submitPost' fullWidth variant="contained" onClick={this.editPost}>
                      Edit Post
                    </Button>
                  </Grid>
                </Grid>
             </Grid>
        </form>
      )
      

      

      const nonAuthoredPost = (     
      <div className='post'>
        <p><b>{this.props.postProps.title}</b></p>
        <p><b>Goal: </b> {' ' + this.props.postProps.goal}</p>
        <p>Method: {' ' + this.props.postProps.method}</p>
        <p>Duration: {' ' + this.props.postProps.duration}</p>
        <p>Results: {' ' + this.props.postProps.results}</p>
        <p>Author: {' ' + this.props.postProps.author}</p>
        <p>Date Posted: {' ' + this.props.postProps.created}</p>
      </div>
      )

      const authoredPost = (     
        <div className='post'>
          <p><b>{this.props.postProps.title}</b></p>
          <p><b>Goal: </b> {' ' + this.props.postProps.goal}</p>
          <p>Method: {' ' + this.props.postProps.method}</p>
          <p>Duration: {' ' + this.props.postProps.duration}</p>
          <p>Results: {' ' + this.props.postProps.results}</p>
          <p>Author: {' ' + this.props.postProps.author}</p>
          <p>Date Posted: {' ' + this.props.postProps.created}</p>
          <span><button value={this.props.postProps._id} onClick={this.changeToEdit} >Edit Post</button><button value={this.props.postProps._id}>Delete Post</button></span>
          
        </div>
        )




        if (this.state.editForm){
          return (
            editForm
          )
        }
        else if (this.props.appState.user.username === this.props.postProps.author){
          return (
            authoredPost
          )
        }
        else{
          return (
            nonAuthoredPost
             )
        }
      }
    }
    
    export default Post;
