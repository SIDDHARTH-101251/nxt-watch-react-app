import AppContext from '../../context/AppContext'

import './index.css'

const NoSearchResults = props => {
  const {retry} = props
  const onClickRetry = () => {
    retry()
  }
  return (
    <AppContext.Consumer>
      {value => {
        const {darkMode} = value
        const headingStyleNoSearchResult = darkMode
          ? 'heading-no-search-results-dark'
          : 'heading-no-search-results-light'
        return (
          <div className="no-search-results-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <h1 className={headingStyleNoSearchResult}>
              No Search results found
            </h1>
            <p>Try different key words or remove search filter</p>
            <button
              type="button"
              className="retry-button-no-search-found-page"
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

export default NoSearchResults
