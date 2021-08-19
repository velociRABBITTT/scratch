import React, { Component } from "react";
import Login from './Login.jsx';
import CreateUser from './CreateUser.jsx';
import NavBar from './NavBar.js';
import FeedContainer from './../containers/FeedContainer.jsx';

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
  createUserClick() {
    return this.setState({createUser: true});
  }

  // function to create user in database
  async actualCreate() {
    let newUser = document.getElementById('cUser').value;
    let newEmail = document.getElementById('cEmail').value;
    let newPassword = document.getElementById('cPassword').value;
    let confirmPassword = document.getElementById('cPassword2').value;

    if (newPassword != confirmPassword) {
      alert('Passwords must match')
    } else {
      const body = { username: newUser, email: newEmail, password: newPassword };
      await fetch('/new', {
        method: 'POST',
        headers: {'Content-Type': 'Application/JSON'},
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(user => {
        if (!user.status) {
          this.setState({ userLoggedIn: true, user: user, createUser: false });
        } else {
          alert(`there was an error creating a user ${user.message}`);
        }
      })
      .catch(err => console.log(err));
      }
  }

//function to login user to site
  async loginUser() {
    let loginUser = document.getElementById('lUser').value;
    let loginPass = document.getElementById('lPass').value;
    let body = { username: loginUser, password: loginPass };
    await fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'Application/JSON'},
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(user => {
      if (!user.status) {
        this.setState({ userLoggedIn: true, user: user });
      }
    })
    .catch(err => console.log(err));
  }

  // Get all posts on mount, makes the request once
  async componentDidMount() {
    await this.updatePosts();

    fetch('/sess')
      .then(res => res.json())
      .then(user => {
        if (user.loggedIn === false){
          console.log(user.loggedIn, ',,, user not logged in ,,,');
          return;
        }
        console.log(user, 'user returned from fetch request');
        this.setState ({ userLoggedIn: true, user: user });
      })
      .catch(err => console.log(err));
  }

  updatePosts() {
    fetch('/posts')
    .then(res => res.json())
    .then(arr => {
      this.setState({ feed: arr });
    })
    .catch(err => console.log(err));
  }

  render () {
    //CONDITIONAL 1 DEFAULT: Checks if user IS NOT logged in & checks if create user has NOT been selected yet - Renders only the login screen
    if (!this.state.userLoggedIn && !this.state.createUser) {
      return (
        <Login handleLogin={this.loginUser} handleCreate={this.createUserClick} />
      );
      //CONDITIONAL 2: Create User...Check if this.state create user is true - if so we render create user screen
    } else if (this.state.createUser) {
      return (
        <CreateUser handleCreate={this.actualCreate} />
      );
      //CONDITION 3:If user is logged in - we will render the feed screen
    } else if (this.state.userLoggedIn) {
      return (
        <div>
          <NavBar AppState={{...this.state}} update={this.updatePosts}/>
          <FeedContainer AppState={{...this.state}} update={this.updatePosts}/>
        </div>
      );
    }
  }
}

export default App;
