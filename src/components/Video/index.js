import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'
import ReactPlayer from 'react-player'
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

class Video extends Component {
  state = {
    videoData: {},
    view: views.initial,
    isLargeDevice: false,
    isLiked: false,
    isDisliked: false,
    saved: false,
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
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
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

    if (response.ok) {
      this.setState({
        videoData: data.video_details,
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
    const {videoData, isLiked, isDisliked, saved} = this.state
    const video = (
      <AppContext.Consumer>
        {value => {
          const {darkMode, onChangeSavedVideos} = value
          const videoTitleStyle = darkMode
            ? 'video-title-style-dark'
            : 'video-title-style-light'
          const likedButtonStyle = isLiked ? 'color-blue' : 'color-black'
          const dislikedButtonStyle = isDisliked ? 'color-blue' : 'color-black'
          const savedButtonStyle = saved ? 'color-blue' : 'color-black'
          return (
            <div className="videos-page-main-container">
              <ReactPlayer url={videoData.video_url} className="react-player" />
              <div className="video-details-container-1">
                <p className={videoTitleStyle}>{videoData.title}</p>
                <div className="pos-3">
                  <div className="pos-1">
                    <p className="video-span-style-1">
                      {videoData.view_count} views
                    </p>
                    <p className="video-span-style-1">
                      {formatDistanceToNow(new Date(videoData.published_at))}
                    </p>
                  </div>
                  <div className="pos-2">
                    <button
                      type="button"
                      className="like-dislike-button-style"
                      onClick={this.onClickLikeButton}
                    >
                      <div className="pos-1">
                        <BiLike
                          className={`video-like-dislike-icon ${likedButtonStyle}`}
                        />
                        <p className={`video-span-style-2 ${likedButtonStyle}`}>
                          Like
                        </p>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="like-dislike-button-style"
                      onClick={this.onClickDislikeButton}
                    >
                      <div className="pos-1">
                        <BiDislike
                          className={`video-like-dislike-icon ${dislikedButtonStyle}`}
                        />
                        <p
                          className={`video-span-style-2 ${dislikedButtonStyle}`}
                        >
                          Dislike
                        </p>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="like-dislike-button-style"
                      onClick={() =>
                        this.onClickSaveButton(onChangeSavedVideos)
                      }
                    >
                      <div className="pos-1">
                        <BiListPlus
                          className={`video-like-dislike-icon ${savedButtonStyle}`}
                        />
                        <p className={`video-span-style-2 ${savedButtonStyle}`}>
                          {saved ? 'Saved' : 'Save'}
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
                <hr />
                <div className="video-channel-details-container">
                  <img
                    src={videoData.channel.profile_image_url}
                    alt={videoData.channel.name}
                    className="video-profile-image"
                  />
                  <div>
                    <p className={videoTitleStyle}>{videoData.channel.name}</p>
                    <p className="video-span-style-1">
                      {videoData.channel.subscriber_count}
                    </p>
                  </div>
                </div>
                <p className="video-span-style-2">{videoData.description}</p>
              </div>
            </div>
          )
        }}
      </AppContext.Consumer>
    )

    return video
  }

  renderFailureView = () => <Failure retry={this.retry} />

  onClickSaveButton = func => {
    const {videoData} = this.state

    this.setState(prevState => ({
      saved: !prevState.saved,
    }))

    func(videoData)
  }

  onClickLikeButton = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislikeButton = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
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

          return isLargeDevice ? (
            <div>
              <Header />
              <div className="large-device-content-container">
                <div className="sidebar">
                  <Sidebar />
                </div>
                <div className="content-contaienr">
                  <div
                    className={trendingPageBG}
                    data-testid="videoItemDetails"
                  >
                    <Header />
                    {content}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={trendingPageBG} data-testid="videoItemDetails">
              <Header />
              {content}
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}
export default Video
