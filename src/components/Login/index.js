import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
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
    }
    const url = 'https://apis.ccbp.in/login'

    try {
      const response = await fetch(url, options)

      if (response.ok) {
        const data = await response.json()
        const jwtToken = data.jwt_token
        Cookies.set('jwtToken', jwtToken, {
          expires: 1, // Expires in 1 day
        })
        const {history} = this.props
        history.replace('/')
      } else {
        const data = await response.json()
        const errMsg = data.error_msg // Assuming the error message key is `error_msg`
        this.setState({
          errMsg,
        })
      }
    } catch (error) {
      console.error('Network error:', error)
      this.setState({
        errMsg: 'Something went wrong. Please try again later.',
      })
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
    const jwtToken = Cookies.get('jwtToken')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
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
                {errMsg.length !== 0 ? (
                  <p className="error-message">*{errMsg}</p>
                ) : (
                  ''
                )}
              </form>
            </div>
          )
        }}
      </AppContex.Consumer>
    )
  }
}

export default Login
