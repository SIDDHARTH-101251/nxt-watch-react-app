import {Component} from 'react'
import {IoMdClose} from 'react-icons/io'
import './index.css'

class GetPremium extends Component {
  state = {
    close: false,
  }

  onClickCloseButton = () => {
    this.setState({
      close: true,
    })
  }

  render() {
    const {close} = this.state
    return close ? (
      <div className="temp-div" />
    ) : (
      <div className="get-premium-section" data-testid="banner">
        <div className="get-premium-text-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
            className="logo-get-premium-section"
          />
          <p className="get-premium-para">
            Buy Nxt Watch Premium prepaid plans with UPI
          </p>
          <button type="button" className="get-it-now-button">
            GET IT NOW
          </button>
        </div>
        <div className="cross-icon-container">
          <button
            type="button"
            aria-label="close-button"
            onClick={this.onClickCloseButton}
            className="close-button-style"
            data-testid="close"
          >
            <IoMdClose className="close-icon" />
          </button>
        </div>
      </div>
    )
  }
}

export default GetPremium
