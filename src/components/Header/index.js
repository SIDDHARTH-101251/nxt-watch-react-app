import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {FaMoon} from 'react-icons/fa'
import {IoMenu, IoSunnyOutline} from 'react-icons/io5'
import {BsBoxArrowRight} from 'react-icons/bs'
import AppContext from '../../context/AppContext'
import './index.css'

class Header extends Component {
  state = {
    largeDevice: false,
  }

  componentDidMount = () => {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize)
  }

  onClickLogout = () => {
    Cookies.remove('jwtToken')
    const {history} = this.props
    history.replace('/login')
  }

  handleResize = () => {
    const width = window.innerWidth
    this.setState({
      largeDevice: width > 1024,
    })
  }

  onClickLogo = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {darkMode, onChangeMode} = value
          const navbarStyle = darkMode ? 'navbar-dark' : 'navbar'
          const optionStyle = darkMode ? 'nav-icon-dark' : 'nav-icon'
          const logoUrl = darkMode
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          const logoutButtonStyle = darkMode
            ? 'logout-button-large-device-dark'
            : 'logout-button-large-device'
          const unorderedListStyle = !darkMode
            ? 'nav-items-small-device'
            : 'nav-items-small-device-dark'
          const {largeDevice} = this.state
          const popupContainerBg = darkMode ? 'dark' : ''

          return (
            <nav className={navbarStyle}>
              <button
                type="button"
                className="logo-button"
                onClick={this.onClickLogo}
              >
                <img
                  src={logoUrl}
                  alt="website logo"
                  className="website-logo-nav-bar-sm"
                />
              </button>

              <div className="nav-options-container-sm">
                <button
                  type="button"
                  aria-label="mode-button"
                  className="option-button"
                  onClick={onChangeMode}
                  data-testid="theme"
                >
                  {darkMode ? (
                    <IoSunnyOutline className={optionStyle} />
                  ) : (
                    <FaMoon className={optionStyle} />
                  )}
                </button>
                <button
                  type="button"
                  aria-label="options"
                  className="option-button"
                >
                  {largeDevice ? (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      alt="profile"
                      className="profile-image-large-device"
                    />
                  ) : (
                    <Popup
                      modal
                      trigger={
                        <button
                          type="button"
                          aria-label="small-devise-tab"
                          className="hamburger-button"
                        >
                          <IoMenu className={optionStyle} />
                        </button>
                      }
                      className="popup-content"
                    >
                      {close => (
                        <div>
                          <button
                            type="button"
                            className="trigger-button"
                            onClick={() => close()}
                          >
                            Close
                          </button>
                          <ul className={unorderedListStyle}>
                            <li>
                              <Link to="/">Home</Link>
                            </li>
                            <li>
                              <Link to="/trending">Trending</Link>
                            </li>
                            <li>
                              <Link to="/gaming">Gaming</Link>
                            </li>
                            <li>
                              <Link to="/saved">Saved Videos</Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </Popup>
                  )}
                </button>
                {largeDevice ? (
                  <div>
                    <Popup
                      modal
                      trigger={
                        <button className={logoutButtonStyle} type="button">
                          Logout
                        </button>
                      }
                      className="popup-content"
                    >
                      {close => (
                        <div>
                          <div>
                            <p className="popup-text">
                              Are you sure, you want to logout?
                            </p>
                          </div>
                          <div className="popup-button-container">
                            <button
                              type="button"
                              className="trigger-button"
                              onClick={() => close()}
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="confirm-button"
                              onClick={this.onClickLogout}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </div>
                ) : (
                  <Popup
                    modal
                    trigger={
                      <button
                        className="logout-button-small-device"
                        type="button"
                        onClick={this.onClickLogout}
                        aria-label="close-button"
                      >
                        <BsBoxArrowRight className={optionStyle} />
                      </button>
                    }
                    className={`popup-content ${popupContainerBg}`}
                  >
                    {close => (
                      <div>
                        <div>
                          <p className="popup-text">
                            Are you sure, you want to logout?
                          </p>
                        </div>
                        <div className="popup-button-container">
                          <button
                            type="button"
                            className="trigger-button"
                            onClick={() => close()}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="confirm-button"
                            onClick={this.onClickLogout}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                )}
              </div>
            </nav>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default withRouter(Header)
