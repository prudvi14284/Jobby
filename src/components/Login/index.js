import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    usernameError: '',
    passwordError: '',
  }

  successLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  failureLogin = errorMsg1 => {
    this.setState({errorMsg: errorMsg1})
  }

  usernameBlurFun = () => {
    const {username} = this.state
    if (username === '') {
      this.setState({usernameError: '* Required'})
    } else {
      this.setState({usernameError: ''})
    }
  }

  passwordBlurFun = () => {
    const {password} = this.state
    if (password === '') {
      this.setState({passwordError: '* Required'})
    } else {
      this.setState({passwordError: ''})
    }
  }

  onChangeUserName = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  submitFun = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userData = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userData)}
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.successLogin(data.jwt_token)
    } else {
      console.log(data.error_msg)
      this.failureLogin(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {
      userName,
      password,
      errorMsg,
      passwordError,
      usernameError,
    } = this.state
    return (
      <div className="loginBg">
        <form className="formContainer" onSubmit={this.submitFun}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="appLogo"
          />
          <div className="inputForms">
            <label className="inputs" htmlFor="userName">
              USERNAME
            </label>
            <input
              id="userName"
              value={userName}
              type="text"
              placeholder="Username"
              className="inputElement"
              onChange={this.onChangeUserName}
              onBlur={this.usernameBlurFun}
            />
            <p className="errMsg">{usernameError}</p>
            <label className="inputs" htmlFor="password">
              PASSWORD
            </label>
            <input
              id="password"
              value={password}
              type="password"
              placeholder="Password"
              className="inputElement"
              onChange={this.onChangePassword}
              onBlur={this.passwordBlurFun}
            />
            <p className="errMsg">{passwordError}</p>
            <button type="submit" className="button">
              Login
            </button>
            {errorMsg === '' ? null : <p className="errMsg">* {errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
