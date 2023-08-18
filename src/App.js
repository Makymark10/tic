import logo from './logo.svg';
import './App.css';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import { useState } from 'react'


function Square({value, onClickSquare}) {
    // const [value, setValue] = useState(null);
    // const letterX = 'x';
  
    // const handleClick = () => handleClick(0) {
    //   if (!value) {
    //     setValue(letterX);
    //   }
    // };
  
    return (
      <button
        className={`squares ${value ? 'clicked' : ''}`}
        onClick={onClickSquare}
      >
        {value}
      </button>
    );
  }
function Title() {
    return (
        <h1 className="h1Style">
            Tic-Tac Toe <br />game
        </h1>
    )
}


function Board({xIsNext, squares, onPlay}) {
    // const [ xIsNext, setxIsNext] = useState(true)
    // const [squares, setSquares] = useState(Array(9).fill(null));

    //declaring the winner and draw
    const winner = calculatingWinner(squares);
    const draw = isDraw(squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    }
    else if (draw) {
        status = "Its a Draw";
    } 
    else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

    //button function
    function handleClick(i) {
        if (squares[i] || calculatingWinner(squares)) {
            return;
        }

     const nextSquare = squares.slice()
     if (xIsNext) {
        nextSquare[i] = "X"
     } else {
        nextSquare[i] = "O"
     }
       onPlay(nextSquare);
    }
 return (
    <>
    <div className='title'>
        <Title />
    </div>
    <div className="status">{status}</div>
        <div className="board-row">
            <Square value={squares[0]} onClickSquare={() => handleClick(0)} />
            <Square value={squares[1]} onClickSquare={() => handleClick(1)}/>
            <Square value={squares[2]} onClickSquare={() => handleClick(2)}/>
            
        </div>
        <div className="board-row">
            <Square value={squares[3]} onClickSquare={() => handleClick(3)}/>
            <Square value={squares[4]} onClickSquare={() => handleClick(4)}/>
            <Square value={squares[5]} onClickSquare={() => handleClick(5)}/>
        </div>
        <div className="board-row">
            <Square value={squares[6]} onClickSquare={() => handleClick(6)}/>
            <Square value={squares[7]} onClickSquare={() => handleClick(7)}/>
            <Square value={squares[8]} onClickSquare={() => handleClick(8)}/>
        </div>
    </>
 )
}

//posibilities of the winner
function calculatingWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
}

//posibilities of the draw
function isDraw(squares) {
  for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
          return false; // If any empty square is found, it's not a draw
      }
  }
  return true; // If all squares are filled, it's a draw
}

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Move #' + move;
    } else {
      description = 'Game Start (restart)';
    }
    return (
      <li key={move}>
        <p className='history' onClick={() => jumpTo(move)}>{description}</p>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game
// export default TextwtBtn
