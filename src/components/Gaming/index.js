import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
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

class Gaming extends Component {
  state = {
    gamingList: [],
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

  getData = async () => {
    const url = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({
      view: views.loading,
    })

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({
        gamingList: data.videos,
        view: views.success,
      })
    } else {
      this.setState({
        view: views.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {gamingList} = this.state
    const modifiedList = gamingList.map(eachItem => ({
      id: eachItem.id,
      thumbnailUrl: eachItem.thumbnail_url,
      title: eachItem.title,
      viewCount: eachItem.view_count,
    }))

    const gamingContent = (
      <ul className="gaming-content-outer-container">
        {modifiedList.map(eachItem => (
          <AppContext.Consumer key={eachItem.id}>
            {value => {
              const {darkMode} = value
              return (
                <li className="gaming-card-gaming-page">
                  <button
                    type="button"
                    className="button-style-gaming-page"
                    onClick={() => this.onClickVideo(eachItem.id)}
                  >
                    <img
                      src={eachItem.thumbnailUrl}
                      alt={eachItem.title}
                      className="gaming-page-thumb-nail"
                    />
                  </button>
                  <div className="trending-page-video-details-container">
                    <div>
                      <p
                        className={
                          darkMode
                            ? 'trending-page-video-name-dark margin-bottom'
                            : 'trending-page-video-name-light margin-bottom'
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
                        {eachItem.viewCount}
                      </span>
                      <br />
                      <span
                        className={
                          darkMode
                            ? 'trending-page-span-item-style-dark'
                            : 'trending-page-span-item-style-light'
                        }
                      >
                        Worldwide
                      </span>
                    </div>
                  </div>
                </li>
              )
            }}
          </AppContext.Consumer>
        ))}
      </ul>
    )

    return gamingContent
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
                <div className="content-contaienr">
                  <div className={trendingPageBG} data-testid="gaming">
                    <Header />
                    <div
                      className={trendingPageTopContainer}
                      data-testid="banner"
                    >
                      <div className={trendingPageFireIconContainer}>
                        <SiYoutubegaming className="trending-page-fire-icon" />
                      </div>
                      <h1 className={trendingPageMainHeading}>Gaming</h1>
                    </div>
                    {content}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={trendingPageBG} data-testid="gaming">
              <Header />
              <div className={trendingPageTopContainer} data-testid="banner">
                <div className={trendingPageFireIconContainer}>
                  <SiYoutubegaming className="trending-page-fire-icon" />
                </div>
                <h1 className={trendingPageMainHeading}>Gaming</h1>
              </div>
              {content}
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
export default Gaming
