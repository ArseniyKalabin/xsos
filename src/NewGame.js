import React from 'react';

const newGame = props => {
    let message = <div>Draw!</div>;
    if(props.winner){
        message = <div>Player {props.winner} wins!</div>;
    }
    return(
    <div className="newgame">
        <div className="winner">
        {message}
        <button className="greenButton" onClick={props.restart}>New Game</button>
        </div>
    </div>
)};

export default newGame;