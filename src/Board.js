import React, { Component } from 'react';
import Cell from './Cell';
import NewGame from './NewGame';

const initialState = {
    cells: Array(9).fill(null),
    player: 'X',
    weHaveAWinner: false,
    draw: false
};
const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

class Board extends Component {

    state = {
        cells: Array(9).fill(null),
        player: 'X',
        weHaveAWinner: false,
        draw: false
    }

    cellClickHandler = (id) => {
        let tempArr = [...this.state.cells];
        if(tempArr[id] || this.state.weHaveAWinner || this.state.draw){
            return;
        }
        tempArr[id] = this.state.player;
        this.setState({cells: tempArr});  
        this.checkWinner(tempArr);   
    }

    checkWinner = (tempArr) => {
        let counter = 0;
        for (let i in winnerLines){
            if (
                tempArr[winnerLines[i][0]] 
                && tempArr[winnerLines[i][0]] === tempArr[winnerLines[i][1]] 
                && tempArr[winnerLines[i][1]] === tempArr[winnerLines[i][2]]
                ){
                    this.setState({weHaveAWinner:true});
                    return;
                }
        }
        tempArr.forEach(val => {
            if(!val){
                counter++;
            }
        });
        if(!counter){
            this.setState({draw:true});
            return;
        }
        this.setState(state => ({player: state.player === 'X'?'O':'X'}));
    }

    randomMoveHandler = () => {
        let tempArr = [...this.state.cells], emptyKeys = [];
        tempArr.forEach((val,key) => {
            if(!val){
                emptyKeys.push(key);
            }
        })
        this.cellClickHandler(emptyKeys[Math.floor(Math.random() * emptyKeys.length)]);
    }

    restartGameHandler = () => {
        this.setState(initialState);
    }

    render(){
        let renderArr = [...this.state.cells], newGame = null;

        if(this.state.weHaveAWinner){
            newGame = <NewGame winner={this.state.player} restart={this.restartGameHandler} />
        }
        if(this.state.draw){
            newGame = <NewGame restart={this.restartGameHandler} />
        }

        return (
            <div className="game">
                <div>Player: {this.state.player}</div>
                <div className="board">
                    {renderArr.map((val, key) => {
                        return(
                        <Cell click={this.cellClickHandler} value={val} id={key} key={key} />
                        )}
                    )}
                    {newGame}
                </div>    
                <div>
                    <button className="redButton" onClick={this.restartGameHandler}>Restart</button>
                    <button className="greenButton" onClick={this.randomMoveHandler}>Random</button>
                </div>
            </div>
        );
    };
};

export default Board;