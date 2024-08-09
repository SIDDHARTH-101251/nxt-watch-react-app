import {Component} from 'react'
import Cookies from 'js-cookie'
import AppContex from '../../context/AppContext'
import './index.css'

class Login extends Component {
  state = {
    errMsg: '',
    username: '',
    password: '',
    show: false,
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {
        'Content-Type': 'application/json',
      },
      // mode: 'no-cors',
    }
    const url = 'https://apis.ccbp.in/login'

    try {
      await fetch(url, options)
      console.log(
        'Request sent, but unable to verify the response due to no-cors mode.',
      )
    } catch (error) {
      console.error('Network error:', error)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }))
  }

  render() {
    return (
      <AppContex.Consumer>
        {value => {
          const {darkMode} = value
          const logoUrl = darkMode
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const bgColor = darkMode
            ? 'login-form-container-dark'
            : 'login-form-container'

          const loginFromStyle = darkMode ? 'login-form-dark' : 'login-form'

          const formLabelStyle = darkMode ? 'form-label-dark' : 'form-label'

          const formInputElementStyle = darkMode
            ? 'form-input-element-dark'
            : 'form-input-element'

          const showPasswordTextStyle = darkMode
            ? 'show-password-label-dark'
            : 'show-password-label'

          const {errMsg, username, password, show} = this.state

          return (
            <div className={bgColor}>
              <form className={loginFromStyle} onSubmit={this.onFormSubmit}>
                <img src={logoUrl} alt="website logo" className="logo" />
                <label htmlFor="username" className={formLabelStyle}>
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className={formInputElementStyle}
                  placeholder="Username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
                <label htmlFor="password" className={formLabelStyle}>
                  PASSWORD
                </label>
                <input
                  type={show ? 'text' : 'password'}
                  id="password"
                  className={formInputElementStyle}
                  placeholder="Password"
                  value={password}
                  onChange={this.onChangePassword}
                />
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="checkbox"
                    onClick={this.onClickShowPassword}
                  />
                  <label htmlFor="checkbox" className={showPasswordTextStyle}>
                    Show Password
                  </label>
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {errMsg.length !== 0 ? <p>*{errMsg}</p> : ''}
              </form>
            </div>
          )
        }}
      </AppContex.Consumer>
    )
  }
}

export default Login
