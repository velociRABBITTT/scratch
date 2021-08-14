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

class App extends Component { 
  constructor() {
    super();
    this.state = {
      userLoggedIn: false,
      createUser: false,
      user: undefined,
      feed: undefined,
    }
  }


  render () {
    if (!this.state.userLoggedIn) {
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
              <Button color="default" className='createUser' fullWidth type="submit" variant="contained">
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
  }
}
export default App;
