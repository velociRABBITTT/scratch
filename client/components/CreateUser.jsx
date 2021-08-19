import React, { Component } from 'react';
import { Button, TextField, Grid, Container } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';

class CreateUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
                  <Button color="primary" id='createNewUser' className='createUser' fullWidth variant="contained" onClick={this.props.handleCreate}>
                    Create New User
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </div>
      </StylesProvider>
    );
  }
}

export default CreateUser;
