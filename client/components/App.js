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

class App extends Component { 
  constructor() {
    super();
    this.state = {
      userLoggedIn: false,
      createUser: false,
      user: undefined,
      feed: undefined,
    }
    this.createUserClick = this.createUserClick.bind(this)
  }

  createUserClick(){
    this.setState({createUser: true});
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
                  <TextField fullWidth label="Email" name="email" size="small" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
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
              <Button color="primary" fullWidth type="submit" variant="contained">
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
                  <TextField fullWidth label='Username' name='Username' size='small' variant='outlined' />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email" name="email" size="small" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
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
              <Button color="primary" className='createUser' fullWidth type="submit" variant="contained">
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
