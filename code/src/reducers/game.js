import { createSlice } from '@reduxjs/toolkit'

// Added the loading property
const game = createSlice({
  name: 'game',
  initialState: {
    userName: '',
    gameElements: null,
    history: [], // for saving the previous step
  },

  // Added setLoading reducer
  reducers: {
    setUserName: (store, action) => {
      store.userName = action.payload
    },
    setGameElements: (store, action) => {
      if (store.gameElements !== null) {
        store.history = [...store.history, store.gameElements] // save the previous step
      }
      store.gameElements = action.payload
    },
    setLoading: (store, action) => {
      store.loading = action.payload
    },
    setHistory: (store, action) => {
      store.gameElements = store.history[store.history.length - 1] // update gameElements to be a last element of history array
      store.history = store.history.slice(0, store.history.length - 1) // return a modified copy of array -- start slicing from index 0 and stop slicing to store.history.length - 1.
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
