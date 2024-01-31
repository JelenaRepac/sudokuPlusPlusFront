import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Sudoku.css';
import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { fetchBoardFromBackend, checkCellValue, checkSudokuValidity, solveSudoku, fetchBoardFromBackendHard, fetchBoardFromBackendMedium, fetchBoardFromBackendEasy } from './SudokuController.js';
import Swal from 'sweetalert2';
import SudokuCell from './SudokuCell.js';

const SudokuView = () => {
  const [board, setBoard] = useState([]);
  const [initialCells, setInitialCells] = useState([]);
  const [invalidCells, setInvalidCells] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [timer, setTimer] = useState(0); // Assuming timer is in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBoardFromBackend();
        console.log(data.board);
        setBoard(data.board);
        setInitial(data);
        setInvalidCells([]);
      } catch (error) {
        console.log(error);
      }
    };


    if (board.length === 0) {
      fetchData();
    }
  }, [board]);


  const setInitial = (data) =>{
    const initialCellsPositions = [];
    data.board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== 0) {
          initialCellsPositions.push({ row: rowIndex, col: colIndex });
        }
      });
    });
    setInitialCells(initialCellsPositions);
  }

  const handleCellClick = (rowIndex, columnIndex) => {
    const isEditable = board[rowIndex][columnIndex] === 0;
    setSelectedNumber(board[rowIndex][columnIndex]);
    setSelectedCell({ rowIndex, columnIndex, isEditable });
  };

  const handleChange = async (rowIndex, columnIndex, value) => {
    setInvalidCells([]);
    const res = await checkCellValue(board,rowIndex, columnIndex, value);
    const isValueValid = res.result;
    setInvalidCells((prevInvalidCells) =>
    isValueValid
      ? prevInvalidCells.filter(
          (cell) => cell[0] !== rowIndex || cell[1] !== columnIndex
        )
      : [...prevInvalidCells, [rowIndex, columnIndex]]
    );
   

    const newData = board.map((row, i) =>
      i === rowIndex ? row.map((cell, j) => (j === columnIndex ? value : cell)) : row
    );
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

  const initializeNewBoard = async () => {
    try {
      const data = await fetchBoardFromBackend();
      setBoard(data.board);
      setInitial(data);
      setInvalidCells([]);

    } catch (error) {
      console.log(error);
    }
  }

  const algorithmResult = () => {
    //resavanje table uz pomoc algoritma i dobijanje rezultata
  }

  const generateHardBoard = async () => {
    try {
      const data = await fetchBoardFromBackendHard();
      console.log(data);
      setBoard(data.board);
      setInitial(data);
      setInvalidCells([]);

    } catch (error) {
      console.log(error);
    }
  }
  const generateMediumBoard = async () => {
    try {
      const data = await fetchBoardFromBackendMedium();
      console.log(data);
      setBoard(data.board);
      setInitial(data);
      setInvalidCells([]);

    } catch (error) {
      console.log(error);
    }
  }
  const generateEasyBoard = async () => { 
    try {
      const data = await fetchBoardFromBackendEasy();
      console.log(data);
      setBoard(data.board);
      setInitial(data);
      setInvalidCells([]);

    } catch (error) {
      console.log(error);
    }
  }

  const handleSolveSudoku = async (board) => {
    try {
      const data = await solveSudoku();
      console.log(data);
      setBoard(data);
      setInvalidCells([]);

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
          <button className="button-check" onClick={initializeNewBoard} style={{ "width": "180px" }}>
            Initialize new board
          </button>
          <button className="button-check" onClick={algorithmResult} style={{ "width": "180px" }}>
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
                isInitial={initialCells.some(
                  (position) =>
                    position.row === rowIndex && position.col === columnIndex
                )}
                isEditable={!initialCells.some(
                  (position) =>
                    position.row === rowIndex && position.col === columnIndex
                )}
                isInvalid={invalidCells.some(
                  (position) =>
                    position[0] === rowIndex && position[1] === columnIndex
                )}
                onCellClick={() => handleCellClick(rowIndex, columnIndex)}
                onCellBlur={(value) => handleChange(rowIndex, columnIndex, value)}
            />
            ))}
          </div>
        ))}

          <div className='action'>
            <CiPlay1 onClick={startTimer} className="icon" />
            <CiPause1 onClick={pauseTimer} className="icon" />
          </div>
          <div className='check'>
            <button onClick={handleCheckSudokuValidity} className="button-check" style={{ "width": "140px" }}>
              Check Validity
            </button>
            <button onClick={handleSolveSudoku} className="button-check" style={{ "width": "140px" }}>
              Solve
            </button>
          </div>


        </div>


        <div className='levels'>
          <button onClick={generateEasyBoard} className="button-check" style={{ "color": "green" }}>
            EASY
          </button>
          <button onClick={generateMediumBoard} className="button-check" style={{ "color": "yellow" }}>
            MEDIUM
          </button>
          <button onClick={generateHardBoard} className="button-check" style={{ "color": "red" }}>
            HARD
          </button>
        </div>

      </div>
    </div>
  );
};

export default SudokuView;
