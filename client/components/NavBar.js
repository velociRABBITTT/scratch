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
  import { borders } from '@material-ui/system';
  import { StylesProvider, styled } from '@material-ui/core/styles';

  const SubmitContainer = styled(Container)({
   
    

  })

  class NavBar extends Component {
    constructor(props){
      super(props);
      this.state = {
        createPost: false
      };

      this.createPostOnClick = this.createPostOnClick.bind(this);
      this.submitNewPost = this.submitNewPost.bind(this);
      this.cancelCreateOnClick = this.cancelCreateOnClick.bind(this);
    }

    
    createPostOnClick(e) {
      this.setState({ createPost: true })
    }
    cancelCreateOnClick(e) {
      this.setState({ createPost: false });
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


      await fetch('/posts', {
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
//CONDITIONAL 1: DEFAULT render the Navbar with ability to create post button
      if (!this.state.createPost){
      return(
        <section className='sticky'>
          <div className="topnav">
            <div className="logoWelcome">
              <img id="logo" src="https://cdn.discordapp.com/attachments/876099998331322400/876906653956571136/actualize6.png"></img>
              {/* <a className="active" href="#">Actualize</a> */}
          <Button color="primary" id='createPost' className='createPost' fullWidth variant="contained" size='small' onClick={this.createPostOnClick}>Create Post</Button>
              <center><h1 id='welcome'>Welcome {this.props.AppState.user.username}</h1></center>
              {/* <input id='createPost' type="text" placeholder="create post"></input> */}
            </div>
          
          </div>
        </section>
      )
    }
//CONDITIONAL 2: Once create Post is clicked, we render the edit post
    if (this.state.createPost){
      return (
        <section className='sticky'>
          <div className="topnav">
          <div className="logoWelcome">
              <img id="logo" src="https://cdn.discordapp.com/attachments/876099998331322400/876906653956571136/actualize6.png"></img>
              {/* <a className="active" href="#">Actualize</a> */}
              <center><h1 id='welcome'>Welcome {this.props.AppState.user.username}</h1></center>
              {/* <input id='createPost' type="text" placeholder="create post"></input> */}
            </div>
          </div>
          <SubmitContainer maxWidth='md'>
            <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField id='pTitle' fullWidth label='Title' name='Title' size='small' variant='outlined' />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField id='pGoal' fullWidth label="Goal" name="Goal" size="small" variant="outlined" multiline={true}/>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id='pMethod'
                            fullWidth
                            label="Method"
                            name="Method"
                            size="small"
                            variant="outlined"
                            multiline={true}
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
                          multiline={true}
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
                            multiline={true}
                          />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      {/* SUBMIT POST BUTTON */}
                      <Button id='submitPost' color="primary" className='submitPost' fullWidth variant="contained" onClick={this.submitNewPost}>
                        Submit New Post
                      </Button>
                      {/* CANCEL CREATE POST BUTTON */}
                      <Button id='cancelPost' color="secondary" className='submitPost' fullWidth variant="contained" border={2} onClick={this.cancelCreateOnClick}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
              </Grid>
          </SubmitContainer>
        
      </section>
      
      ) 
    }

  }
  }

  export default NavBar;