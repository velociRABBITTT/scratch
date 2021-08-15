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
  import { StylesProvider, makeStyles, styled } from '@material-ui/core/styles';
import { grey } from "@material-ui/core/colors";


  const PostContainer = styled(Container)({
    background: 'black',
    color: 'white'

  })

  const PostTextField = styled(TextField)({
    color: 'white',

  })


  class Post extends Component {
    constructor(props) {
      super(props);
      this.state = {
        editForm: false,
        targetId: undefined,
        id: this.props.postProps._id
      }
      this.editPost = this.editPost.bind(this);
      this.changeToEdit = this.changeToEdit.bind(this);
      this.deletePost = this.deletePost.bind(this);
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
        id: this.state.id,
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
      // const targetId = e.target.value;
      this.setState({ editForm: true})
    }

    deletePost(e) {
      const targetId = {id: this.state.id};
      fetch('/deletePost', {
        method: 'POST',
        headers: {'Content-Type':'Application/JSON'},
        body: JSON.stringify(targetId)
      })
      .then(res => res.json())
      .then(arr => {
      //console.log(arr)
      this.props.update();
    })
    }

    render () {

      
      const editForm = (
        <Container maxWidth='xs'>
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
             </Container>
      )
      

      

      const nonAuthoredPost = (     
      // <div className='post'>
      //   <p><b>{this.props.postProps.title}</b></p>
      //   <p><b>Goal: </b> {' ' + this.props.postProps.goal}</p>
      //   <p>Method: {' ' + this.props.postProps.method}</p>
      //   <p>Duration: {' ' + this.props.postProps.duration}</p>
      //   <p>Results: {' ' + this.props.postProps.results}</p>
      //   <p>Author: {' ' + this.props.postProps.author}</p>
      //   <p>Date Posted: {' ' + this.props.postProps.created}</p>
      // </div>
      <PostContainer maxWidth='md' >
         <h1><b>{this.props.postProps.title}</b></h1>
         <h3><b>Goal: </b></h3>
         <p className='postText'> {' ' + this.props.postProps.goal}</p>
         <h3><b>Method:</b></h3>
         <p className='postText'> {' ' + this.props.postProps.method}</p>
         <h3><b>Duration: </b></h3>
         <p className='postText'> {' ' + this.props.postProps.duration}</p>
         <h3><b>Results: </b></h3>
         <p className='postText'> {' ' + this.props.postProps.results}</p>
         <h3>Author: {' ' + this.props.postProps.author}</h3>
         {/* <p></p> */}
         <h3>Date Posted:{' ' + this.props.postProps.created}</h3>
        {/* <p> </p> */}
      </PostContainer>
      )

      const authoredPost = (     
      
        <PostContainer maxWidth='md' >
        <h1><b>{this.props.postProps.title}</b></h1>
        <h3><b>Goal: </b></h3>
        <p className='postText'> {' ' + this.props.postProps.goal}</p>
        <h3><b>Method:</b></h3>
        <p className='postText'> {' ' + this.props.postProps.method}</p>
        <h3><b>Duration: </b></h3>
        <p className='postText'> {' ' + this.props.postProps.duration}</p>
        <h3><b>Results: </b></h3>
        <p className='postText'> {' ' + this.props.postProps.results}</p>
        <h3>Author: {' ' + this.props.postProps.author}</h3>
        {/* <p></p> */}
        <h3>Date Posted:{' ' + this.props.postProps.created}</h3>
       {/* <p> </p> */}
       <span><Button onClick={this.changeToEdit} color='primary' variant="contained" >Edit Post</Button><Button onClick={this.deletePost} color='secondary' variant="contained">Delete Post</Button></span>
        </PostContainer>
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
