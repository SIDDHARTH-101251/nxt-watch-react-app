import React from 'react'

const AppContext = React.createContext({
  darkMode: false,
  onChangeMode: () => {},
  savedVideos: [],
  onChangeSavedVideos: () => {},
})

export default AppContext
