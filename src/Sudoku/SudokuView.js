import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Sudoku.css';
import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { fetchBoardFromBackend, checkCellValue,solveSud, getCellHints, checkSudokuValidity, solveSudoku, fetchBoardFromBackendHard, fetchBoardFromBackendMedium, fetchBoardFromBackendEasy } from './SudokuController.js';
import Swal from 'sweetalert2';
import SudokuCell from './SudokuCell.js';
import { PiClockClockwiseThin  } from "react-icons/pi";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { withTheme } from '@emotion/react';
const SudokuView = () => {
  const [board, setBoard] = useState([]);
  const [initialCells, setInitialCells] = useState([]);
  const [invalidCells, setInvalidCells] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [timer, setTimer] = useState(0); // Assuming timer is in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isLightbulbClicked, setIsLightbulbClicked] = useState(false);
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

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
  const resetTimer = () =>{
    setTimer(0);
  }

  const clearBord = () => {
    const clearedBoard = board.map((row, rowIndex) =>
    row.map((cell, colIndex) =>
      initialCells.some(
        (position) => position.row === rowIndex && position.col === colIndex
      )
        ? cell
        : 0
    )
  );

  setBoard(clearedBoard);
  setInvalidCells([]);

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

  const handleLightbulbClick = () => {
    setTooltipContent(null);
    setIsLightbulbClicked(!isLightbulbClicked);
  };

  const handleMouseEnter = async (rowIndex, colIndex, event) => {
    if (isLightbulbClicked) {
      const result = await getCellHints(board, rowIndex, colIndex);
      setTooltipContent(result.result); 

      if (event) {
        const tooltipTop = event.clientY + window.scrollY;
        const tooltipLeft = event.clientX + window.scrollX;
        setTooltipPosition({ top: tooltipTop, left: tooltipLeft });
      }
  
    }
  };
  const handleMouseLeave = () => {
    setTooltipContent(null); 
  };

  //CHECK WHOLE BOARD VALIDITY
  const handleCheckSudokuValidity = async () => {
    try {
       const isValid = await checkSudokuValidity(board);
      console.log(isValid.result);
      if (isValid.result) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sudoku is solved",
          width: 500,
          background: `url('https://img.freepik.com/free-vector/abstract-horizontal-grid-lines-graph-style-graphic-design_1017-39918.jpg?size=626&ext=jpg&ga=GA1.1.34264412.1706745600&semt=ais')`,
          padding: "15px",
          timer: 1000,
          customClass: {
            title: 'pop-up'
          },
          showConfirmButton: false,
        });
      }
      else{
        Swal.fire({
          position: "top-end",
          icon:"error",
          title: "Sudoku is not solved",
          width: 500,
          background: `url('https://img.freepik.com/free-vector/abstract-horizontal-grid-lines-graph-style-graphic-design_1017-39918.jpg?size=626&ext=jpg&ga=GA1.1.34264412.1706745600&semt=ais')`,
          padding: "15px",
          timer: 1000,
          customClass: {
            title: 'pop-up',
          },
          showConfirmButton: false,
        
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
                onMouseEnter={(event) => handleMouseEnter(rowIndex, columnIndex,event)}
                onMouseLeave={handleMouseLeave}
            />
            ))}
          </div>
        ))}

          <div className='action'>
            <CiPlay1 onClick={startTimer} className="icon" />
            <CiPause1 onClick={pauseTimer} className="icon" />
            <PiClockClockwiseThin onClick = {resetTimer} className="icon" style={{"font-size":"35px"}} />
            <HiOutlineLightBulb className="icon" style={{"color":"orange"}}  onClick={handleLightbulbClick}/>
          </div>
          <div className='check'>
            <button onClick={handleCheckSudokuValidity} className="button-check" style={{ "width": "140px" }}>
              Check Validity
            </button>
            <button onClick={()=>handleSolveSudoku(board)} className="button-check" style={{ "width": "140px" }}>
              Solve
            </button>
            <button onClick={clearBord} className="button-check" style={{ "width": "140px" }}>
              CLEAR
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

      {Array.isArray(tooltipContent) && (
        <div className="tooltip" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
          {tooltipContent.map((number, index) => (
            <div key={index}>{number}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SudokuView;
