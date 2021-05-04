import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
/* import StartGame from './StartGame' - it wasnt being used*/ 

import  game  from '../reducers/game'
import "nes.css/css/nes.min.css";

//I removed the import of the slice game
import { continueGame } from 'reducers/game'

const GameElements = () => {
    const gameElements = useSelector(store => store.game.gameElements)
    const history = useSelector(store => store.game.history)
   /*  const userName = useSelector(store => store.game.gameElements.userName) */
   const userName = useSelector(store => store.game.userName) 
   

    //console.log(gameElements)

    const dispatch = useDispatch()

    return (
        <div className="nes-container is-rounded is-dark game-container">
           <p>{gameElements.description}</p> 
            {/* // With gameElements.actions?.map we execute maping IF actions is an array. Shorthand to if statement. */}
           {gameElements.actions.map(item => {
               return ( 
                    <button
                      className="nes-btn is-error"
                      key={item.direction}
                      onClick={() => dispatch(continueGame(userName, item.direction))}
                    >{item.direction}</button> 
                        
               )})}
               <button onClick={() => dispatch(game.actions.setHistory())} disabled={!history.length}>Go back</button>
        </div>
    )
}

export default GameElements