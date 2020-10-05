import React, { Component } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { auth } from '../actions';
import { connect } from 'react-redux';
import Axios from 'axios';
import Loader from 'react-loader-spinner';

import { logout } from '../actions/login';
import { Redirect } from 'react-router-dom';
// import Loader from 'react-loader-spinner';

class LoginComponent extends Component {
  state = {
    cred: {
      userName: '',
      password: ''
    },
    showSpinner: false,
    displayWarning: null
  }
  componentDidMount() {
    this.props.logout();
  }
  handleChange(event) {
    let data = this.state.cred;
    data[event.target.name] = event.target.value;
    this.setState({ cred: data })
  }
  submit = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.cred.userName, this.state.cred.password)
    this.setState({ displayWarning: "Invalid User" })
    console.log(this.props)
    this.setState({ showSpinner: true });
    this.props.history.push('/')

  }
  render() {
    let snipper = <></>
    if (this.state.showSpinner) {

      snipper = <><Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
        <div style={{ height: '100vh', width: '100vw', background: ' #f0f8ff47' }}></div>
      </>;

    }
    return (
      <div>
        {snipper}
        {this.props.isAuthenticated ? '' : <div>{this.state.displayWarning}</div>}
        <header className="boxShw">
          <div id="header-bg" className="headerLogo">
            <img src="/images/logo.png" alt="azure logo" />
          </div>
        </header>
        <div className="login-section">
          <form className="login" method="post" acceptCharset="utf-8">
            <p>
              <Form.Control className="login-input" type="text" name="userName" value={this.state.cred.userName} onChange={(item) => this.handleChange(item)} id="username" placeholder="username" />
            </p>

            <p>
              <Form.Control className="login-input" type="password" name="password" value={this.state.cred.password} onChange={(item) => this.handleChange(item)} id="password" placeholder="password" />
            </p>
            <p className="login-submit">
              <button onClick={this.submit} className="login-button">Login</button>
            </p>
            {/* <Loader type="Oval" color="#00BFFF" height={80} width={80} /> */}

            {/* <!--  <p class="forgot-password"><a href="javascript:void(0);">Forgot your password?</a></p> --> */}
          </form>
        </div>
        <footer className="loginFooter darkBlueGradient">
          <span>Copyright © <img src="/images/logo_thumb.png" alt="logo" /> All rights reserved</span>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.loginReducer.isAuthenticated,

  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    onAuth: (email, password) => dispatch(auth(email, password))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);