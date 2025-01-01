import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {FaFireAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import AppContext from '../../context/AppContext'
import Sidebar from '../Sidebar'
import Failure from '../Failure'
import './index.css'

const views = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  noresult: 'NO_RESULT',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    trendingList: [],
    view: views.initial,
    isLargeDevice: false,
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    this.getData()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const width = window.innerWidth
    this.setState({
      isLargeDevice: width > 768,
    })
  }

  retry = () => {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/videos/trending'
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({view: views.loading})

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        this.setState({
          trendingList: data.videos,
          view: views.success,
        })
      } else {
        this.setState({view: views.failure})
      }
    } catch {
      this.setState({view: views.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {trendingList} = this.state
    const modifiedList = trendingList.map(eachItem => ({
      id: eachItem.id,
      channel: eachItem.channel,
      publishedAt: eachItem.published_at,
      thumbnailUrl: eachItem.thumbnail_url,
      title: eachItem.title,
      viewCount: eachItem.view_count,
    }))

    return modifiedList.map(eachItem => (
      <AppContext.Consumer key={eachItem.id}>
        {value => {
          const {darkMode} = value
          return (
            <li key={eachItem.id}>
              <button
                type="button"
                onClick={() => this.onClickVideo(eachItem.id)}
                className="button-trending-page"
              >
                <div className="trending-page-video-container-style">
                  <img
                    src={eachItem.thumbnailUrl}
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
                        {eachItem.viewCount}
                      </span>
                      <span
                        className={
                          darkMode
                            ? 'trending-page-span-item-style-dark'
                            : 'trending-page-span-item-style-light'
                        }
                      >
                        {formatDistanceToNow(new Date(eachItem.publishedAt))}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          )
        }}
      </AppContext.Consumer>
    ))
  }

  renderFailureView = () => <Failure retry={this.retry} />

  onClickVideo = id => {
    const {history} = this.props
    history.push(`/videos/${id}`)
  }

  render() {
    const {view, isLargeDevice} = this.state
    let content
    switch (view) {
      case views.loading:
        content = this.renderLoadingView()
        break
      case views.success:
        content = this.renderSuccessView()
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
          const trendingPageBG = darkMode
            ? 'trending-page-main-container-dark'
            : 'trending-page-main-container-light'
          const trendingPageTopContainer = darkMode
            ? 'trending-top-container-dark'
            : 'trending-top-container-light'
          const trendingPageFireIconContainer = darkMode
            ? 'trending-page-fire-icon-container-dark'
            : 'trending-page-fire-icon-container-light'
          const trendingPageMainHeading = darkMode
            ? 'trending-page-main-heading-dark'
            : 'trending-page-main-heading-light'
          return isLargeDevice ? (
            <div>
              <Header />
              <div className="large-device-content-container">
                <div className="sidebar">
                  <Sidebar />
                </div>
                <div className="content-container">
                  <div className={trendingPageBG} data-testid="trending">
                    <Header />
                    <div
                      className={trendingPageTopContainer}
                      data-testid="banner"
                    >
                      <div className={trendingPageFireIconContainer}>
                        <FaFireAlt className="trending-page-fire-icon" />
                      </div>
                      <h1 className={trendingPageMainHeading}>Trending</h1>
                    </div>
                    <ul>{content}</ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={trendingPageBG} data-testid="trending">
              <Header />
              <div className={trendingPageTopContainer} data-testid="banner">
                <div className={trendingPageFireIconContainer}>
                  <FaFireAlt className="trending-page-fire-icon" />
                </div>
                <h1 className={trendingPageMainHeading}>Trending</h1>
              </div>
              <ul>{content}</ul>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Trending
