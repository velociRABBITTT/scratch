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
  import { StylesProvider, styled, ThemeProvider } from '@material-ui/core/styles';
  import FeedContainer from './../containers/FeedContainer.jsx'
  import NavBar from './NavBar.js'


  const LoginButton = styled(Button)({
    background: '#DE8B47'
  })

  const CreateUserButton = styled(Button)({
    background: '#5E80DF'
  })




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
    this.updatePosts = this.updatePosts.bind(this);
  }


  // On click function for when user clicks on "create user". Changes state to rerender create user box.
  createUserClick(){
    this.setState({createUser: true});
  }

  // function to create user in database

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
//create new user
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


  //function to login user to site

  }

  async loginUser() {

    let loginUser = await document.getElementById('lUser').value;
    let loginPass = await document.getElementById('lPass').value;
    let body = await {username: loginUser, password: loginPass};
    console.log(body)

    await fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'Application/JSON'},
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(user => {
      console.log(user);
      if (!user.status){
        this.setState({ userLoggedIn: true, user: user})
      }
    })
    .catch(err => console.log(err));





  }


  // Get all posts on mount, makes the request once

  componentDidMount() {

    fetch('/posts')
      .then(res => res.json())
      .then(arr => {
        console.log(arr)
        this.setState({ feed: arr })
      })
  }

  updatePosts() {
    fetch('/posts')
    .then(res => res.json())
    .then(arr => {
      //console.log(arr)
      this.setState({ feed: arr })
    })
  }


  render () {

    //CONDITIONAL 1 DEFAULT: Checks if user IS NOT logged in & checks if create user has NOT been selected yet - Renders only the login screen

    if (!this.state.userLoggedIn && !this.state.createUser) {
      return (
        <StylesProvider injectFirst>
          <div id ='login'>

            <Container maxWidth="xs" >
              <img id="logo" src="https://cdn.discordapp.com/attachments/876099998331322400/876861169980293140/comp_12.png"></img>
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
                    <LoginButton fullWidth id='loginButton' variant="contained" onClick={this.loginUser}>
                      Log in
                    </LoginButton>
                    <CreateUserButton color="primary" id='createUser' className='createUser' fullWidth variant="contained" onClick={this.createUserClick}>
                      Create User
                    </CreateUserButton>
                  </Grid>
                </Grid>
              </form>
          </Container>
        </div>
      </StylesProvider>
      )
    }//END CONDITIONAL 1: Default, Login screen
    //CONDITIONAL 2: Create User...Check if this.state create user is true - if so we render user login screen
    if(this.state.createUser){
      return (
        <StylesProvider injectFirst>
          <div id ='createUserBox'>
            <Container maxWidth="xs">
              <img id="logo" src="https://cdn.discordapp.com/attachments/876099998331322400/876861169980293140/comp_12.png"></img>
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
                    <Button color="primary" id='createNewUser' className='createUser' fullWidth variant="contained" onClick={this.actualCreate}>
                      Create New User
                    </Button>
                  </Grid>
                </Grid>
              </form>
          </Container>
        </div>
      </StylesProvider>
      )
    }//END OF CONDITIONAL 2: Create User
    //CONDITION 3:If user is logged in - we will render the feedContainer
    if (this.state.userLoggedIn){
      return (
        <section>
        <NavBar AppState={{...this.state}} update={this.updatePosts}/>
        <FeedContainer AppState={{...this.state}} update={this.updatePosts}/>
        </section>
      )
    }//END OF CONDITIONAL 3: if user is logged in
  }//End of Render ()
}//END of App Compoent
export default App;
