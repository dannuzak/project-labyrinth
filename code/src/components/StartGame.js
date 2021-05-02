import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import "nes.css/css/nes.min.css";

import game, { startGame } from '../reducers/game'
/* import GameElements from './GameElements' it wasnt being used */

const StartGame = () => {
  const [userName, setUserName] = useState('')
  const dispatch = useDispatch()

  const handleStartGame = (event) => {
    event.preventDefault()
    dispatch(game.actions.setUserName(userName))
    dispatch(startGame(userName))
    setUserName('')
  }

  return (
    <form onSubmit={handleStartGame} className="nes-balloon from-left nes-pointer is-dark form-container">
      <p>Welcome to our amazing game!</p>
      <div className="nes-field is-inline">
   
        <input
          type="text"
          value={userName}
          placeholder="Enter your name"
          onChange={(event) => setUserName(event.target.value)}
          className="nes-input is-success input-text"
          id="inline_field"
          required
        />
      </div>
      <button type="onSubmit" className="nes-btn is-success">
        Start Game
      </button>
    </form>
  )
}

export default StartGame
