import {Link} from 'react-router-dom'
import {Component} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {FaFireAlt} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddFill} from 'react-icons/ri'
import AppContext from '../../context/AppContext'
import './index.css'

class Sidebar extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {darkMode, activeTab, onChangeTab} = value
          const sidebarBgStyle = darkMode ? 'sidebar-dark' : 'sidebar-light'

          // Define styles based on the active tab
          const tab1Style =
            activeTab === 'home' && !darkMode
              ? 'navigation-button-container-active'
              : 'navigation-button-container'
          const tab2Style =
            activeTab === 'trending' && !darkMode
              ? 'navigation-button-container-active'
              : 'navigation-button-container'
          const tab3Style =
            activeTab === 'gaming' && !darkMode
              ? 'navigation-button-container-active'
              : 'navigation-button-container'
          const tab4Style =
            activeTab === 'saved' && !darkMode
              ? 'navigation-button-container-active'
              : 'navigation-button-container'
          const button1 =
            activeTab === 'home' && !darkMode
              ? 'navigation-buttons-active'
              : 'navigation-buttons'
          const button2 =
            activeTab === 'trending' && !darkMode
              ? 'navigation-buttons-active'
              : 'navigation-buttons'
          const button3 =
            activeTab === 'gaming' && !darkMode
              ? 'navigation-buttons-active'
              : 'navigation-buttons'
          const button4 =
            activeTab === 'saved' && !darkMode
              ? 'navigation-buttons-active'
              : 'navigation-buttons'

          const activeIcon1 =
            activeTab === 'home' ? 'icon-style-active' : 'icon-style'
          const activeIcon2 =
            activeTab === 'trending' ? 'icon-style-active' : 'icon-style'
          const activeIcon3 =
            activeTab === 'gaming' ? 'icon-style-active' : 'icon-style'
          const activeIcon4 =
            activeTab === 'saved' ? 'icon-style-active' : 'icon-style'

          const tab1StyleDark =
            activeTab === 'home' && darkMode
              ? 'navigation-button-container-active-dark'
              : 'navigation-button-container'
          const tab2StyleDark =
            activeTab === 'trending' && darkMode
              ? 'navigation-button-container-active-dark'
              : 'navigation-button-container'
          const tab3StyleDark =
            activeTab === 'gaming' && darkMode
              ? 'navigation-button-container-active-dark'
              : 'navigation-button-container'
          const tab4StyleDark =
            activeTab === 'saved' && darkMode
              ? 'navigation-button-container-active-dark'
              : 'navigation-button-container'
          const button1Dark =
            activeTab === 'home' && darkMode
              ? 'navigation-buttons-active-dark'
              : 'navigation-buttons-dark'
          const button2Dark =
            activeTab === 'trending' && darkMode
              ? 'navigation-buttons-active-dark'
              : 'navigation-buttons-dark'
          const button3Dark =
            activeTab === 'gaming' && darkMode
              ? 'navigation-buttons-active-dark'
              : 'navigation-buttons-dark'
          const button4Dark =
            activeTab === 'saved' && darkMode
              ? 'navigation-buttons-active-dark'
              : 'navigation-buttons-dark'

          const footerParaStyle = darkMode ? 'footer-para-dark' : 'footer-para'

          const onClickHomeTab = () => {
            onChangeTab('home')
          }

          const onClickTrendingTab = () => {
            onChangeTab('trending')
          }

          const onClickGamesTab = () => {
            onChangeTab('gaming')
          }

          const onClickSavedTab = () => {
            onChangeTab('saved')
          }

          return (
            <div className={sidebarBgStyle}>
              <div>
                <div className={darkMode ? tab1StyleDark : tab1Style}>
                  <Link to="/" className="link-style-large-device">
                    <button
                      type="button"
                      className={darkMode ? button1Dark : button1}
                      onClick={onClickHomeTab}
                    >
                      <AiFillHome className={activeIcon1} />
                      Home
                    </button>
                  </Link>
                </div>
                <div className={darkMode ? tab2StyleDark : tab2Style}>
                  <Link to="/trending" className="link-style-large-device">
                    <button
                      type="button"
                      className={darkMode ? button2Dark : button2}
                      onClick={onClickTrendingTab}
                    >
                      <FaFireAlt className={activeIcon2} />
                      Trending
                    </button>
                  </Link>
                </div>
                <div className={darkMode ? tab3StyleDark : tab3Style}>
                  <Link to="/gaming" className="link-style-large-device">
                    <button
                      type="button"
                      className={darkMode ? button3Dark : button3}
                      onClick={onClickGamesTab}
                    >
                      <SiYoutubegaming className={activeIcon3} />
                      Gaming
                    </button>
                  </Link>
                </div>
                <div className={darkMode ? tab4StyleDark : tab4Style}>
                  <Link to="/saved-videos" className="link-style-large-device">
                    <button
                      type="button"
                      className={darkMode ? button4Dark : button4}
                      onClick={onClickSavedTab}
                    >
                      <RiMenuAddFill className={activeIcon4} />
                      Saved Videos
                    </button>
                  </Link>
                </div>
              </div>
              <div className="sidebar-footer-section">
                <p className={footerParaStyle}>CONTACT US</p>
                <div className="company-logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="company-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="company-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="company-icon"
                  />
                </div>
                <p className={footerParaStyle}>
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Sidebar
