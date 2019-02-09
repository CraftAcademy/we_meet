import React, { Component } from 'react';
import { LinkButton, OutlineButton } from 'tailwind-react-ui';
import { connect } from 'react-redux';
import axios from "axios";
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import CreateGroup from '../../Groups/CreateGroup'
import SendEmail from '../../Groups/SendEmail'

// signUpHandler

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.reduxTokenAuth.currentUser.isSignedIn
  }
}
class AppControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLoginForm: false,
      displaySignUpForm: false,
      navBarNotification: ''
    }
    this.loginHandler = this.props.loginHandler.bind(this);
    this.handleLogoutClick = this.props.logoutHandler.bind(this);
    this.signUpHandler = this.props.signUpHandler.bind(this)
  }

  displayLoginForm() {
    this.setState({ displayLoginForm: true })
  }

  hideLoginForm() {
    this.setState({ displayLoginForm: false })
  }

  displaySignUpForm() {
    this.setState({ displaySignUpForm: true })
  }

  hideSignUpForm() {
    this.setState({ displaySignUpForm: false })
  }


  handleLoginClick(e) {
    this.setState({ displayLoginForm: false })
    this.loginHandler(e);
  }

  handleSignUpClick(e) {
    this.setState({ displaySignUpForm: false })
    this.signUpHandler(e);
  }

  displayCreateGroupForm() {
    this.setState({ displayCreateGroupForm: true })
  }

  hideCreateGroupForm() {
    this.setState({ displayCreateGroupForm: false })
  }


  displaySendEmailForm() {
    this.setState({ displaySendEmailForm: true })
  }

  hideSendEmailForm() {
    this.setState({ displaySendEmailForm: false })
  }

  async createGroup(group) {

    const credentials = {
      'access-token': localStorage.getItem('access-token'),
      'token-type': localStorage.getItem('token-type'),
      'client': localStorage.getItem('client'),
      'expiry': localStorage.getItem('expiry'),
      'uid': localStorage.getItem('uid'),
    }
    let response = await axios.post('http://localhost:3000/groups', { group }, { headers: credentials })
    this.setState({ navBarNotification: response.data.message, displayCreateGroupForm: false })

  }

  async sendEmail(email) {

    const credentials = {
      'access-token': localStorage.getItem('access-token'),
      'token-type': localStorage.getItem('token-type'),
      'client': localStorage.getItem('client'),
      'expiry': localStorage.getItem('expiry'),
      'uid': localStorage.getItem('uid'),
    }
    let response = await axios.post('http://localhost:3000/groups/#{group.id}/notifications', { email }, { headers: credentials })
    this.setState({ navBarNotification: response.data.message, displaySendEmailForm: false })

  }


  render() {
    const isSignedIn = this.props.isSignedIn;
    let sendEmailLink, startNewGroupLink, logoutButton, profileLink, loginButton, registerButton, loginForm, signUpForm, groupForm, sendEmail
    if (isSignedIn) {
      sendEmailLink = (
        <LinkButton
          id="create-group"
          onClick={this.displaySendEmailForm.bind(this)}
          text="grey-darkest"
          text-hocus="teal"
          style={{ textDecoration: 'none' }}>
          Send Email
      </LinkButton>);
      startNewGroupLink = (
        <LinkButton
          id="create-group"
          onClick={this.displayCreateGroupForm.bind(this)}
          text="grey-darkest"
          text-hocus="teal"
          style={{ textDecoration: 'none' }}>
          Start a new group
      </LinkButton>);
      profileLink = (
        <LinkButton
          text="grey-darkest"
          text-hocus="teal"
          style={{ marginLeft: '13px', textDecoration: 'none' }}>
          Profile
      </LinkButton>);
      logoutButton = (
        <OutlineButton
          onClick={this.handleLogoutClick.bind(this)}
          brand="primary"
          text-hocus="white"
          style={{ marginLeft: '15px' }}>
          Log out
      </OutlineButton>);
    } else {
      loginButton = (
        <OutlineButton
          onClick={this.displayLoginForm.bind(this)}
          id="login-btn"
          brand="primary"
          text-hocus="white">
          Log in
        </OutlineButton>);
      registerButton = (
        <OutlineButton
          onClick={this.displaySignUpForm.bind(this)}
          brand="primary"
          text-hocus="white"
          style={{ marginLeft: '10px' }}>
          Sign up
        </OutlineButton>);
    }
    if (this.state.displaySendEmailForm) {
      let overlay = document.getElementById('overlay')
      if (overlay) {
        overlay.style.display = ''
        document.getElementById('send-email-form').reset()
      }
      sendEmail = <SendEmail sendEmailHandler={this.sendEmail.bind(this)} hideFormHandler={this.hideSendEmailForm.bind(this)} />
    };

    if (this.state.displayCreateGroupForm) {
      let overlay = document.getElementById('overlay')
      if (overlay) {
        overlay.style.display = ''
        document.getElementById('create-group-form').reset()
      }
      groupForm = <CreateGroup createGroupHandler={this.createGroup.bind(this)} hideFormHandler={this.hideCreateGroupForm.bind(this)} />
    };

    if (this.state.displaySignUpForm) {
      let overlay = document.getElementById('overlay')
      let form = document.getElementById('signup-form')
      if (overlay && form) {
        overlay.style.display = ''
        form.reset()
      }
      signUpForm = <SignUpForm signUpHandler={this.handleSignUpClick.bind(this)} hideFormHandler={this.hideSignUpForm.bind(this)} />

    };

    if (this.state.displayLoginForm) {
      let overlay = document.getElementById('overlay')
      if (overlay) {
        overlay.style.display = ''
        document.getElementById('login-form').reset()
      }
      loginForm = <LoginForm loginHandler={this.handleLoginClick.bind(this)} hideFormHandler={this.hideLoginForm.bind(this)} />
    };

    return (
      <>
        <p style={{color: 'black'}}>{this.state.navBarNotification}</p>
        {sendEmailLink}
        {startNewGroupLink}
        {profileLink}
        {logoutButton}
        {loginButton}
        {registerButton}
        {loginForm}
        {signUpForm}
        {groupForm}
        {sendEmail}
      </>
    );
  }
}

export default connect(mapStateToProps)(AppControl);
