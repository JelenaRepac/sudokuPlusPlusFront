import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Sudoku.css';
import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import SudokuCell from './SudokuCell.js';


const SudokuView = () => {
  const [board, setboard] = useState([]);
  const [invalidCells, setInvalidCells] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [timer, setTimer] = useState(0); // Assuming timer is in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    // const fetchboard = async () => {
    //   try {
    //     const response = await fetch('http://localhost:8080/api/board');
    //     const data = await response.json();
    //     setboard(data);
    //     console.log(data)
    //   } catch (error) {
    //     console.error('Error fetching Sudoku board:', error);
    //   }
    // };

    // fetchboard();
  }, []);


  const handleCellClick = (rowIndex, columnIndex) => {
    setSelectedNumber(board[rowIndex][columnIndex]);
    setSelectedCell({ rowIndex, columnIndex });
  };
  const checkCellValue = async (rowIndex, columnIndex, value) => {

    // try {

    //   const response = await fetch('http://localhost:8080/api/check-cell-value', {
    //     method: 'POST',
    //     body: board+","+rowIndex+","+columnIndex+","+value
    //   });

    //   const result = await response.json();
    //   return result;
    // } catch (error) {
    //   console.error('Error checking cell value:', error);
    //   return false;
    // }
  };
  const handleChange = async (rowIndex, columnIndex, value) => {

    const isValueValid = await checkCellValue(rowIndex, columnIndex, value);

    setInvalidCells((prevInvalidCells) =>
      isValueValid
        ? prevInvalidCells.filter((cell) => cell[0] !== rowIndex || cell[1] !== columnIndex)
        : [...prevInvalidCells, [rowIndex, columnIndex]]
    );

    const newData = [...board];
    newData[rowIndex][columnIndex] = value;

    setboard(newData);
  };
  useEffect(() => {
    setboard([
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]
    );

    let intervalId;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerRunning]);

  const startTimer = () => {
    setIsTimerRunning(true);
  };
  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const initializeNewBoard = () =>{
    //Citanje nove table sa back a
  }
  const algorithmResult = () => {
    //resavanje table uz pomoc algoritma i dobijanje rezultata
  }


  //CHECK WHOLE BOARD VALIDITY
  const checkSudokuValidity = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/if-valid', {
        mode: 'no-cors',
        method: 'POST',

        body: board, // Send board directly, not within params
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error checking Sudoku validity:', error);
    }
  };

  return (
    <div>
      <div className="timer">{timer} seconds</div>

      <div className="sudoku-container">

        <div className="additional-fields">
          <button className="button-check" onClick={initializeNewBoard} style={{"width":"180px"}}>
            Initialize new board
          </button>
          <button className="button-check" onClick={algorithmResult} style={{"width":"180px"}}>
            Algorithm result
          </button>
        </div>

        
        <div className="sudoku-board">

          {board.map((row, rowIndex) => (
             <div key={rowIndex} className="sudoku-row">
             {row.map((cell, columnIndex) => (
               <SudokuCell
                 key={`${rowIndex}-${columnIndex}`}
                 value={cell}
                 isSelected={
                   (selectedCell &&
                     (selectedCell.rowIndex === rowIndex || selectedCell.columnIndex === columnIndex)) ||
                   (selectedNumber && cell === selectedNumber)
                 }
                //  isInvalid={invalidCells.some(
                //    (invalidCell) =>
                //      invalidCell[0] === rowIndex && invalidCell[1] === columnIndex
                //  )}
                 onCellClick={() => handleCellClick(rowIndex, columnIndex)}
                 onCellBlur={(value) => handleChange(rowIndex, columnIndex, value)}
               />
             ))}
           </div>
          ))}
           
          <div className='action'>
            <CiPlay1 onClick={startTimer} className="icon"/>
            <CiPause1 onClick={pauseTimer} className="icon" />
          </div>
          <div className='check'>
            <button onClick={checkSudokuValidity} className="button-check" style={{"width":"140px"}}>
              Check Validity
            </button>
            <button className="button-check" style={{"width":"140px"}}>
              Solve
            </button>
          </div>
          
          
        </div>


         <div className='levels'> 
            <button onClick={checkSudokuValidity} className="button-check" style={{"color":"green"}}>
              EASY
            </button>
            <button onClick={checkSudokuValidity} className="button-check" style={{"color":"yellow"}}>
              MEDIUM
            </button>
            <button onClick={checkSudokuValidity} className="button-check" style={{"color":"red"}}>
              HARD
            </button>
          </div>

      </div>
    </div>
  );
};

export default SudokuView;
