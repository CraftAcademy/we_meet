import React, { Component } from 'react';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  validateForm() {
    return (
      this.state.firstName.length > 0,
      this.state.lastName.length > 0,
      this.state.email.length > 0,
      this.state.password.length > 0      
    )
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="signup_form">
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

            <button type="submit" block bsSize="large" disabled={!this.validateForm()}>Sign up</button>
          </form>
      </div>
    );
  }
}

export default SignUpForm;