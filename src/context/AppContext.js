import React from 'react'

const AppContext = React.createContext({
  darkMode: false,
  activeTab: 'home',
  onChangeMode: prevState => ({
    darkMode: !prevState.darkMode,
  }),
  savedVideos: [],
  onChangeSavedVideos: () => {},
  onChangeTab: () => {},
})

export default AppContext
