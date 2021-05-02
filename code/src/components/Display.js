import React from 'react'
import { useSelector } from 'react-redux'
import GameElements from './GameElements'
import StartGame from './StartGame'
import "nes.css/css/nes.min.css";
// import game from '../reducers/game'

const Display = () => {
  const gameElements = useSelector((store) => store.game.gameElements)

  // created the loading 
  const loading = useSelector((store) => store.game.loading) 

  return (
    <div className="display">
    {loading && <h1 className="loading">LOADING...</h1>}
    {gameElements
     ? <GameElements />
     : <StartGame />
    }
    </div>
  )
}
export default Display
