import {formatDistanceToNow} from 'date-fns'
import {withRouter} from 'react-router-dom' // Import withRouter for navigation
import {BsDot} from 'react-icons/bs'
import AppContext from '../../context/AppContext'
import './index.css'

const HomePageContent = props => {
  const {video, history} = props // Access history from props
  const {channel} = video
  const updatedVideoData = {
    id: video.id,
    publishedAt: video.published_at,
    thumbnailUrl: video.thumbnail_url,
    title: video.title,
    viewCount: video.view_count,
  }
  const updatedChannelData = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }

  const {thumbnailUrl, title, viewCount, publishedAt} = updatedVideoData
  const {profileImageUrl, name} = updatedChannelData
  const time = formatDistanceToNow(new Date(publishedAt))

  const onClickVideo = id => {
    history.push(`/videos/${id}`) // Use history.push to navigate
  }

  return (
    <AppContext.Consumer>
      {value => {
        const {darkMode} = value
        const videoTitleStyle = darkMode ? 'video-title-dark' : 'video-title'
        return (
          <li className="video-container">
            <button
              type="button"
              className="video-button-style"
              onClick={() => onClickVideo(updatedVideoData.id)} // Pass function as reference
            >
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail"
              />
              <div className="video-details-container">
                <div className="profile-image-container">
                  <img
                    src={profileImageUrl}
                    alt="channel logo"
                    className="profile-image-video-section"
                  />
                </div>
                <div className="video-text-container">
                  <p className={videoTitleStyle}>{title}</p>
                  <div className="video-stats-container">
                    <p className="video-stats-text">{name}</p>
                    <BsDot className="dot-icon" />
                    <p className="video-stats-text">{viewCount}</p>
                    <BsDot className="dot-icon" />
                    <p className="video-stats-text">{time}</p>
                  </div>
                </div>
              </div>
            </button>
          </li>
        )
      }}
    </AppContext.Consumer>
  )
}

export default withRouter(HomePageContent) // Wrap component with withRouter
