import { createSlice } from '@reduxjs/toolkit'

// Changed gameElements from {} to null because the conditional in Display-file says:
// "if gameElements is true (object is evaluated to true) display GameElements
//  if gameElements is false (null is evaluated to false) display StartGame"
// Added the loading property
const game = createSlice({
  name: 'game',
  initialState: {
    username: '',
    gameElements: null,
    loading: false,
  },

// Added setLoading reducer
  reducers: {
    setUserName: (store, action) => {
      /*       store.username = action.payload */
      store.userName = action.payload
    },
    setGameElements: (store, action) => {
      store.gameElements = action.payload
    },
    setLoading: (store, action) => {
      store.loading = action.payload
    },
  },
})
// Post request and dispatching the action that will set the game´s elements
// Added .finally() for loading -text. It changes loading-property to true before the request is finished
// and again to false when the fetch is finished
export const startGame = (userName) => {
  return (dispatch) => {
    dispatch(game.actions.setLoading(true))
    fetch('https://wk16-backend.herokuapp.com/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName }),
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(game.actions.setGameElements(json))
      })
      .finally(() => dispatch(game.actions.setLoading(false)))
  }
}

export const continueGame = (userName, direction) => {
  return (dispatch) => {
    dispatch(game.actions.setLoading(true))
    fetch('https://wk16-backend.herokuapp.com/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: userName,
        type: 'move',
        direction: direction,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(game.actions.setGameElements(json))
      })
      .finally(() => dispatch(game.actions.setLoading(false)))
  }
}

export default game
