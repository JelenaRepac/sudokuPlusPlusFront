import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Sudoku.css';
import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { fetchBoardFromBackend, checkCellValue, checkSudokuValidity, solveSudoku, fetchBoardFromBackendHard,fetchBoardFromBackendMedium,fetchBoardFromBackendEasy} from './SudokuController.js';
import Swal from 'sweetalert2';
import classNames from 'classnames';
import SudokuCell from './SudokuCell.js';

const SudokuView = () => {
  const [board, setBoard] = useState([]);
  const [invalidCells, setInvalidCells] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [timer, setTimer] = useState(0); // Assuming timer is in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const data = await fetchBoardFromBackend();
    //     console.log(data.board);
    //     setBoard(data.board);

    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchData();
    // setBoard([
    //   [5, 3, 0, 0, 7, 0, 0, 0, 0],
    //   [6, 0, 0, 1, 9, 5, 0, 0, 0],
    //   [0, 9, 8, 0, 0, 0, 0, 6, 0],
    //   [8, 0, 0, 0, 6, 0, 0, 0, 3],
    //   [4, 0, 0, 8, 0, 3, 0, 0, 1],
    //   [7, 0, 0, 0, 2, 0, 0, 0, 6],
    //   [0, 6, 0, 0, 0, 0, 2, 8, 0],
    //   [0, 0, 0, 4, 1, 9, 0, 0, 5],
    //   [0, 0, 0, 0, 8, 0, 0, 7, 9]
    // ]
    // );
  }, []);


  const handleCellClick = (rowIndex, columnIndex) => {
    const isEditable = board[rowIndex][columnIndex] === 0;

    setSelectedNumber(board[rowIndex][columnIndex]);
    setSelectedCell({ rowIndex, columnIndex, isEditable });
  };
  const checkCellValue = (rowIndex, columnIndex, value) => {
    // const result = checkCellValue(board,rowIndex,columnIndex,value);

  };
  const handleChange = async (rowIndex, columnIndex, value) => {

    const isValueValid = checkCellValue(rowIndex, columnIndex, value);

    setInvalidCells((prevInvalidCells) =>
      isValueValid
        ? prevInvalidCells.filter((cell) => cell[0] !== rowIndex || cell[1] !== columnIndex)
        : [...prevInvalidCells, [rowIndex, columnIndex]]
    );

    const newData = [...board];
    newData[rowIndex][columnIndex] = value;

    setBoard(newData);
  };
  useEffect(() => {
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

  const initializeNewBoard = async () =>{
    try {
      const data = await fetchBoardFromBackend();
      setBoard(data.board);
    } catch (error) {
      console.log(error);
    }
  }
  const algorithmResult = () => {
    //resavanje table uz pomoc algoritma i dobijanje rezultata
  }

  const generateHardBoard = async() =>{
    //generisanje sudoku table 
    try{
      const data = await fetchBoardFromBackendHard();
      console.log(data);
      setBoard(data.board);
    }catch (error) {
      console.log(error);
    }
  }

  const generateMediumBoard = async() =>{
    //generisanje sudoku table 
    try{
      const data = await fetchBoardFromBackendMedium();
      console.log(data);
      setBoard(data.board);
    }catch (error) {
      console.log(error);
    }
  }
  const generateEasyBoard = async() =>{
    //generisanje sudoku table 
    try{
      const data = await fetchBoardFromBackendEasy();
      console.log(data);
      setBoard(data.board);
    }catch (error) {
      console.log(error);
    }
  }

  const handleSolveSudoku = async (board) =>
  {
    try {
      const data = await solveSudoku();
      console.log(data);
      setBoard(data);
    } catch (error) {
      console.log(error);
    }
  }
  //CHECK WHOLE BOARD VALIDITY
  const handleCheckSudokuValidity = async () => {
    try {
      // const isValid = await checkSudokuValidity(board);

      if (true) {
        Swal.fire({
          title: "Sudoku is not solved",
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(/public/logo192.png)",
          backdrop: `
            rgba(0,0,130,0.1)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        });
      }
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
              isEditable={cell === 0}  // Check if the cell is editable
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
            <button onClick={handleCheckSudokuValidity} className="button-check" style={{"width":"140px"}}>
              Check Validity
            </button>
            <button onClick={handleSolveSudoku} className="button-check" style={{"width":"140px"}}>
              Solve
            </button>
          </div>
          
          
        </div>


         <div className='levels'> 
            <button onClick={generateEasyBoard} className="button-check" style={{"color":"green"}}>
              EASY
            </button>
            <button onClick={generateMediumBoard} className="button-check" style={{"color":"yellow"}}>
              MEDIUM
            </button>
            <button onClick={generateHardBoard} className="button-check" style={{"color":"red"}}>
              HARD
            </button>
          </div>

      </div>
    </div>
  );
};

export default SudokuView;
