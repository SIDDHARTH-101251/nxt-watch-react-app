import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import Saved from './components/Saved'
import Video from './components/Video'
import Notfound from './components/NotFound'
import AppContext from './context/AppContext'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    darkMode: false,
    activeTab: 'home',
    savedVideos: [],
  }

  onChangeMode = () => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode,
    }))
  }

  onChangeTab = tab => {
    this.setState({
      activeTab: tab,
    })
  }

  onChangeSavedVideos = video => {
    this.setState(prevState => {
      const existingIndex = prevState.savedVideos.findIndex(
        v => v.id === video.id,
      )

      if (existingIndex !== -1) {
        // If video already exists, remove it
        return {
          savedVideos: [
            ...prevState.savedVideos.slice(0, existingIndex),
            ...prevState.savedVideos.slice(existingIndex + 1),
          ],
        }
      }
      return {
        savedVideos: [...prevState.savedVideos, video],
      }
    })
  }

  render() {
    const {darkMode, activeTab, savedVideos} = this.state
    return (
      <AppContext.Provider
        value={{
          darkMode,
          onChangeMode: this.onChangeMode,
          activeTab,
          onChangeTab: this.onChangeTab,
          savedVideos,
          onChangeSavedVideos: this.onChangeSavedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={Saved} />
          <ProtectedRoute exact path="/videos/:id" component={Video} />
          <Route path="/not-found" component={Notfound} />
          <Redirect to="not-found" />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App
