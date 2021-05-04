import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import  game  from './reducers/game'
import Display from './components/Display'

const reducer = combineReducers({
  game: game.reducer
})

const store = configureStore({ reducer })

export const App = () => {

  return (
    <Provider store ={store}>
      <Display />
    </Provider>
  )
}
