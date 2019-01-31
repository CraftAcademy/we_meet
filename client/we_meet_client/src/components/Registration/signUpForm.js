import React, { Component } from 'react';
import axios from 'axios';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password_confirmation: '',
      authenticated: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return (
      this.state.firstName.length > 0,
      this.state.lastName.length > 0,
      this.state.email.length > 0,
      this.state.password.length > 0,
      this.state.password_confirmation.length > 0
    )
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const apiUrl = 'http://localhost:3000'
    const path = apiUrl + '/auth';
    const response = await axios.post(path, {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    })
    console.log(response)
    sessionStorage.setItem('current_user', JSON.stringify({ id: response.data.data.id }));
    this.storeAuthHeaders(response).then(() => {
      this.setState({ authenticated: true })
    });
  }

  storeAuthHeaders({ headers }) {
    return new Promise((resolve) => {
      const uid = headers['uid'],
        client = headers['client'],
        accessToken = headers['access-token'],
        expiry = headers['expiry'];

      sessionStorage.setItem('credentials', JSON.stringify({
        uid: uid,
        client: client,
        access_token: accessToken,
        expiry: expiry,
        token_type: 'Bearer'
      }));

      resolve(true)
    })
  };

  render() {
    let message, form;
    if (this.state.authenticated === true) {
      message = "You are now signed up!"
    } else {
      form = (
        <form onSubmit={this.handleSubmit}>
          <div>
            <h2>Sign up</h2>
          </div>

          <div>
            <label>First name: </label>
            <input name="first_name" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
          </div>

          <div>
            <label>Last name: </label>
            <input name="last_name" value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
          </div>

          <div>
            <label>Email: </label>
            <input name="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
          </div>

          <div>
            <label>Password: </label>
            <input name="password" type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
          </div>

          <div>
            <label>Password confirmation: </label>
            <input name="password_confirmation" type="password" value={this.state.password_confirmation} onChange={(e) => this.setState({ password_confirmation: e.target.value })} />
          </div>

          <input type="submit" disabled={!this.validateForm()} value='Sign up' />

        </form>
      )
    }

    return (
      <>
        {message}
        {form}
      </>
    );
  }
}

export default SignUpForm;