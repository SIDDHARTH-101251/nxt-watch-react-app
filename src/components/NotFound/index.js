import {Component} from 'react'
import {BiListPlus} from 'react-icons/bi'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import AppContext from '../../context/AppContext'
import Sidebar from '../Sidebar'
import './index.css'

class NotFound extends Component {
  state = {
    isLargeDevice: false,
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const width = window.innerWidth
    if (width > 768) {
      this.setState({
        isLargeDevice: true,
      })
    } else {
      this.setState({
        isLargeDevice: false,
      })
    }
  }

  retry = () => {
    this.getData()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onClickVideo = id => {
    const {history} = this.props
    history.push(`/videos/${id}`)
  }

  renderSuccessView = () => {
    const savedContent = (
      <AppContext.Consumer>
        {value => {
          const {savedVideos, darkMode} = value
          const trendingPageTopContainer = darkMode
            ? 'trending-top-container-dark'
            : 'trending-top-container-light'
          const trendingPageFireIconContainer = darkMode
            ? 'trending-page-fire-icon-container-dark'
            : 'trending-page-fire-icon-container-light'
          const trendingPageMainHeading = darkMode
            ? 'trending-page-main-heading-dark'
            : 'trending-page-main-heading-light'
          console.log(savedVideos)
          return (
            <div>
              <div className={trendingPageTopContainer} data-testid="banner">
                <div className={trendingPageFireIconContainer}>
                  <BiListPlus className="trending-page-fire-icon" />
                </div>
                <h1 className={trendingPageMainHeading}>Trending</h1>
              </div>
              {savedVideos.map(eachItem => (
                <button
                  type="button"
                  onClick={() => this.onClickVideo(eachItem.id)}
                  className="button-trending-page"
                  key={eachItem.id}
                >
                  <div className="trending-page-video-container-style">
                    <img
                      src={eachItem.thumbnail_url}
                      alt={eachItem.title}
                      className="trending-page-thumbnail"
                    />
                    <div className="trending-page-video-details-container">
                      <img
                        src={eachItem.channel.profile_image_url}
                        alt={eachItem.channel.name}
                        className="trending-page-channel-logo"
                      />
                      <div>
                        <p
                          className={
                            darkMode
                              ? 'trending-page-video-name-dark'
                              : 'trending-page-video-name-light'
                          }
                        >
                          {eachItem.title}
                        </p>
                        <span
                          className={
                            darkMode
                              ? 'trending-page-span-item-style-dark'
                              : 'trending-page-span-item-style-light'
                          }
                        >
                          {eachItem.channel.name}
                        </span>
                        <span
                          className={
                            darkMode
                              ? 'trending-page-span-item-style-dark'
                              : 'trending-page-span-item-style-light'
                          }
                        >
                          {eachItem.view_count}
                        </span>
                        <span
                          className={
                            darkMode
                              ? 'trending-page-span-item-style-dark'
                              : 'trending-page-span-item-style-light'
                          }
                        >
                          {formatDistanceToNow(new Date(eachItem.published_at))}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )
        }}
      </AppContext.Consumer>
    )

    return savedContent
  }

  renderFailureView = () => (
    <AppContext.Consumer>
      {value => {
        const {darkMode, savedVideos} = value
        console.log(savedVideos)
        const failureViewBgContainer = darkMode
          ? 'no-saved-videos-bg-containers-dark'
          : 'no-saved-videos-bg-containers-light'
        const noSavedVideosMainHeading = darkMode
          ? 'no-saved-videos-main-heading-dark'
          : 'no-saved-videos-main-heading-light'
        const noSavedVideosParagraph = darkMode
          ? 'no-saved-videos-paragraph-dark'
          : 'no-saved-videos-paragraph-light'
        return (
          <div className={failureViewBgContainer}>
            <img
              src={
                darkMode
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
              }
              alt="not found"
              className="no-saved-videos-image"
            />
            <h1 className={noSavedVideosMainHeading}>Page Not Found</h1>
            <p className={noSavedVideosParagraph}>
              We are sorry, the page you requested could not be found.
            </p>
          </div>
        )
      }}
    </AppContext.Consumer>
  )

  render() {
    const {isLargeDevice} = this.state

    return (
      <AppContext.Consumer>
        {value => {
          const {darkMode, savedVideos} = value
          const trendingPageBG = darkMode
            ? 'trending-page-main-container-dark'
            : 'trending-page-main-container-light'

          return isLargeDevice ? (
            <div>
              <Header />
              <div className="large-device-content-container">
                <div className="sidebar">
                  <Sidebar />
                </div>
                <div className="content-container">
                  <div className={trendingPageBG} data-testid="savedVideos">
                    <Header />
                    {savedVideos.length === 0
                      ? this.renderFailureView()
                      : this.renderSuccessView()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={trendingPageBG} data-testid="savedVideos">
              <Header />
              {savedVideos.length === 0
                ? this.renderFailureView()
                : this.renderSuccessView()}
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
export default NotFound
