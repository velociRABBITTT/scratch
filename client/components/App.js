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
  import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
  import FeedContainer from './../containers/FeedContainer.jsx'

  const testFunc = async () => {
    console.log('testfunc')
  }

class App extends Component { 
  constructor() {
    super();
    this.state = {
      userLoggedIn: false,
      createUser: false,
      session: undefined,
      user: undefined,
      feed: undefined,
    }
    this.createUserClick = this.createUserClick.bind(this);
    this.actualCreate = this.actualCreate.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }


  // On click function for when user clicks on "create user". Changes state to rerender create user box.
  createUserClick(){
    this.setState({createUser: true});
  }

 async actualCreate(){

  let newUser = await document.getElementById('cUser').value;
  let newEmail = await document.getElementById('cEmail').value;
  let newPassword = await document.getElementById('cPassword').value;
  let confirmPassword = await document.getElementById('cPassword2').value;

  if (newPassword != confirmPassword){
    alert('Passwords must match')
  }
  else {
  const body = await {
    username: newUser,
    email: newEmail,
    password: newPassword,
  }
  console.log(body)

  await fetch('/new', {
    method: 'POST',
    headers: {'Content-Type': 'Application/JSON'},
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(user => {
    console.log(user.status);
    if(!user.status){
    this.setState({ userLoggedIn: true, user: user, createUser: false})
    }
    else {
      alert(`there was an error creating a user ${user.message}`)
    }
  })
  .catch(err => console.log(err))
  }

  }

  async loginUser() {

    let loginUser = await document.getElementById('lUser').value;
    let loginPass = await document.getElementById('lPass').value;
    let body = {username: loginUser, password: loginPass};

    await fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'Application/JSON'},
      body: body
    })
    .then(res => res.json())
    .then(user => {
      console.log(user);
      if (!user.status){
        this.setState({ userLoggedIn: true, user: user})
      }
    })
    .catch(err => console.log(err))

  }



  render () {

    //Checks if user is logged in & checks if create user has not been selected yet - if not Renders only the login screen

    if (!this.state.userLoggedIn && !this.state.createUser) {
      return (
        <StylesProvider injectFirst>
          <div id ='login'>
            <Container maxWidth="xs">
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField id='lUser' fullWidth label="Username" name="username" size="small" variant="outlined" />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id='lPass'
                          fullWidth
                          label="Password"
                          name="password"
                          size="small"
                          type="password"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button color="primary" fullWidth type="submit" variant="contained" onClick={this.loginUser}>
                      Log in
                    </Button>
                    <Button color="default" className='createUser' fullWidth type="submit" variant="contained" onClick={this.createUserClick}>
                      Create User
                    </Button>
                  </Grid>
                </Grid>
              </form>
          </Container>
        </div>
      </StylesProvider>
      )
    }

    // Check if this.state create user is true - if so we render user login screen

    if(this.state.createUser){

      return (
        <StylesProvider injectFirst>
          <div id ='createUserBox'>
            <Container maxWidth="xs">
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField id='cUser' fullWidth label='Username' name='Username' size='small' variant='outlined' />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField id='cEmail' fullWidth label="Email" name="email" size="small" variant="outlined" />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id='cPassword'
                          fullWidth
                          label="Password"
                          name="password"
                          size="small"
                          type="password"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField 
                        fullWidth
                        id='cPassword2'
                        label='Confirm Password'
                        name='Confirm Password'
                        size='small'
                        type='password'
                        variant='outlined'
                        
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button color="primary" className='createUser' fullWidth variant="contained" onClick={this.actualCreate}>
                      Create New User
                    </Button>
                  </Grid>
                </Grid>
              </form>
          </Container>
        </div>
      </StylesProvider>



      )
    }








    // If user is logged in - we will render the feedContainer
    if (this.state.userLoggedIn){
      return (
        <FeedContainer AppState={{...this.state}}/>
      )
    }

  }
}
export default App;
