import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoSearch} from 'react-icons/io5'
import Header from '../Header'
import GetPremium from '../GetPremium'
import Sidebar from '../Sidebar'
import HomePageContent from '../HomePageContent'
import NoSearchResults from '../NoSearchResults'
import Failure from '../Failure'
import AppContext from '../../context/AppContext'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const views = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  noresult: 'NO_RESULT',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    isLargeDevice: false,
    videosList: [],
    search: '',
    view: views.initial,
  }

  componentDidMount = () => {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    this.getData()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const width = window.innerWidth
    if (width > 1024) {
      this.setState({
        isLargeDevice: true,
      })
    } else {
      this.setState({
        isLargeDevice: false,
      })
    }
  }

  getData = async () => {
    const {search} = this.state
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
    this.setState({
      view: views.loading,
    })
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        this.setState({
          videosList: data.videos,
          view: data.videos.length === 0 ? views.noresult : views.success,
        })
      } else {
        this.setState({
          view: views.failure,
        })
      }
    } catch (err) {
      this.setState({
        view: views.failure,
      })
    }
  }

  onChangeSearch = event => {
    this.setState({
      search: event.target.value,
    })
  }

  onClickSearchIcon = () => {
    this.getData()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {videosList} = this.state
    return (
      <ul className="videos-flex-container">
        {videosList.map(eachItem => (
          <HomePageContent key={eachItem.id} video={eachItem} />
        ))}
      </ul>
    )
  }

  renderNoSearchResultsView = () => (
    <NoSearchResults retry={this.onClickRetryButton} />
  )

  renderFailureView = () => <Failure retry={this.onClickRetryButton} />

  onClickRetryButton = () => {
    this.getData()
  }

  render() {
    const {isLargeDevice, view} = this.state
    let content
    switch (view) {
      case views.loading:
        content = this.renderLoadingView()
        break
      case views.success:
        content = this.renderSuccessView()
        break
      case views.noresult:
        content = this.renderNoSearchResultsView()
        break
      case views.failure:
        content = this.renderFailureView()
        break
      default:
        content = null
    }

    return (
      <AppContext.Consumer>
        {value => {
          const {darkMode} = value
          const smHomePgBg = darkMode
            ? 'small-device-home-page-content-container-dark'
            : 'small-device-home-page-content-container'
          const searchInputStyle = darkMode
            ? 'search-input-style-dark'
            : 'search-input-style'
          const searchIconStyle = darkMode ? 'search-icon-style-dark' : ''
          const searchIconContainerStyle = darkMode
            ? 'search-icon-container-dark'
            : 'search-icon-container'
          const mediumAndLargeDeviceMainContentBg = darkMode
            ? 'content-video-container-dark'
            : 'content-video-container-light'

          return isLargeDevice ? (
            <div>
              <Header />
              <div className="home-page-main-container-large-device">
                <div className="sidebar">
                  <Sidebar />
                </div>
                <div className="content-container">
                  <GetPremium />
                  <div>
                    <div
                      className={mediumAndLargeDeviceMainContentBg}
                      data-testid="home"
                    >
                      <div className="search-element-container">
                        <div className="search-input-element-container">
                          <input
                            type="search"
                            className={searchInputStyle}
                            placeholder="Search"
                            onChange={this.onChangeSearch}
                          />
                        </div>
                        <div className={searchIconContainerStyle}>
                          <button
                            type="button"
                            onClick={this.onClickSearchIcon}
                            aria-label="Search button"
                            className="search-button-style"
                          >
                            <IoSearch className={searchIconStyle} />
                          </button>
                        </div>
                      </div>
                      {content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Header />
              <GetPremium />
              <div className={smHomePgBg} data-testid="home">
                <div className="search-element-container">
                  <div className="search-input-element-container">
                    <input
                      type="search"
                      className={searchInputStyle}
                      placeholder="Search"
                      onChange={this.onChangeSearch}
                    />
                  </div>
                  <div className={searchIconContainerStyle}>
                    <button
                      type="button"
                      onClick={this.onClickSearchIcon}
                      aria-label="Search button"
                      className="search-button-style"
                    >
                      <IoSearch className={searchIconStyle} />
                    </button>
                  </div>
                </div>
                {content}
              </div>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Home
