import AppContext from '../../context/AppContext'

import './index.css'

const Failure = props => {
  const {retry} = props
  const onClickRetry = () => {
    retry()
  }
  return (
    <AppContext.Consumer>
      {value => {
        const {darkMode} = value
        const headingStyleFailure = darkMode
          ? 'heading-style-failure-dark'
          : 'heading-style-failure-light'
        const failureImage = darkMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className="failure-container">
            <img src={failureImage} alt="failure view" />
            <h1 className={headingStyleFailure}>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button
              type="button"
              className="retry-button-failure-page"
              onClick={onClickRetry}
            >
              Retry
            </button>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}

export default Failure
