import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {userName: '', password: '', errorMsg: ''}

  inputUserName = event => {
    this.setState({userName: event.target.value})
  }

  inputpassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = error => {
    this.setState({errorMsg: error, userName: '', password: ''})
  }

  loginform = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {username: userName, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {userName, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-container">
          <img
            src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1715855750/music_zo3pdp.png"
            alt="login website logo"
            className="music"
          />
          <h1 className="heading">Spotify Remix</h1>
          <form className="loginform" onSubmit={this.loginform}>
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              value={userName}
              type="input-text"
              onChange={this.inputUserName}
              className="input"
              id="username"
            />
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              value={password}
              type="password"
              className="input"
              onChange={this.inputpassword}
              id="password"
            />
            <button className="button" type="submit">
              LOGIN
            </button>
          </form>
          <p className="error">{errorMsg}</p>
        </div>
      </div>
    )
  }
}
export default LoginForm
