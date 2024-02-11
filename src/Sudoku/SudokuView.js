import React, { useSyncExternalStore } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Sudoku.css';
import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { fetchBoardFromBackend, checkCellValue,solveSud, fetchBestResult, fetchLeaderboard,checkIfNumberIsFilled, sudokuDifficulty,getCellHints, checkSudokuValidity, solveSudoku, fetchBoardFromBackendHard, fetchBoardFromBackendMedium, fetchBoardFromBackendEasy, insertTime } from './SudokuController.js';
import Swal from 'sweetalert2';
import SudokuCell from './SudokuCell.js';
import { PiClockClockwiseThin  } from "react-icons/pi";
import { HiOutlineLightBulb } from "react-icons/hi2";
import {serverError} from '../PopUp.js';
import { CiUser } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";

const SudokuView = () => {
  const emptyBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  
  const [board, setBoard] = useState(emptyBoard);

    
  const [initialCells, setInitialCells] = useState([]);
  const [invalidCells, setInvalidCells] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [timer, setTimer] = useState(0); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isLightbulbClicked, setIsLightbulbClicked] = useState(false);
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [boardClicked, setBoardClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastCellValue, setLastCellValue] = useState(null);
  const [time, setTime] = useState(0);
  const [solvedBoard, setSolvedBoard] = useState([]);
  const [user, setUser]= useState(null);
  const [initialBoard, setInitialBoard] = useState([]);

  useEffect(() => {
    gamer();
    const fetchData = async () => {
      try {
        console.log("jej");
        setLoading(true);
        const data = await fetchBoardFromBackend();
        console.log(data.board);
        setInitialBoard(data.board);
        setBoard(data.board);
        setInitial(data);
        setInvalidCells([]);
      } catch (error) {
        serverError(error);
      } finally{
        setLoading(false);
      }
    };
        fetchData();
        fetchBest();
        fetchLeaders();
  
    
  }, []);


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

    if (!boardClicked) { 
      setBoardClicked(true);
      startTimer(); 
    }
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
   
    if (!newData.some(row => row.includes(0))) {
      handleCheckSudokuValidity(); 
      setLastCellValue(value);
      setTime(timer);
      setSolvedBoard(board);
      


      setTimeout(() => {
        generateEasyBoard();
       }, 1000); 
    }
   
  };

  useEffect(() => {
    if (lastCellValue !== null) {
      console.log(lastCellValue);
      pauseTimer();
      resetTimer();
    }
  }, [lastCellValue]);

  useEffect( () => {
    if(user != null && time != 0){
      insertTime(initialBoard, solvedBoard, time, user)
      .then(() => fetchBest())
      .then(() => fetchLeaders());
    }
   
  }, [solvedBoard]);

  
  

  const gamer = async () =>{
  
    const { value: formValues } = await Swal.fire({
      title: "Insert your name:",
      html: `
        <input id="swal-input1" class="swal2-input">
      `,
      focusConfirm: false,
      background: `url('https://img.freepik.com/free-vector/abstract-horizontal-grid-lines-graph-style-graphic-design_1017-39918.jpg?size=626&ext=jpg&ga=GA1.1.34264412.1706745600&semt=ais')`,
      padding: "15px",
      width:"500px",
      customClass: {
        title: 'pop-up',
        confirmButton:'button',
      },
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
        ];
      }
    });
    if (formValues) {
      setUser(formValues[0]);
    }
   
  }
  // const checkNumberFilled = async (value) =>{
  //   console.log(board);
  //   const numberFilled  = await checkIfNumberIsFilled(board, value);
  //   if(numberFilled){
  //     Swal.fire({
  //       position: "center",
  //       icon: "success",
  //       title: value ,
  //       width: 200,
  //       background: `url('https://img.freepik.com/free-vector/abstract-horizontal-grid-lines-graph-style-graphic-design_1017-39918.jpg?size=626&ext=jpg&ga=GA1.1.34264412.1706745600&semt=ais')`,
  //       padding: "15px",
  //       timer: 1000,
  //       customClass: {
  //         title: 'pop-up'
  //       },
  //       showConfirmButton: false,
  //     });
  //   }
  // }
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

   const fetchBest = async () => {
    try {
      const result = await fetchBestResult(); 
      const user = result.user;
      const time = formatTime(result.time);
      
      if(user === null){
        document.getElementById('user-field').textContent ="X";
        document.getElementById('time-field').textContent = "X";
      }
      else{
        document.getElementById('user-field').textContent = `${user}`;
        document.getElementById('time-field').textContent = `${time}`;
      }
    
    } catch (error) {
      console.error('Error fetching best result:', error);
    }
  }

  const fetchLeaders = async () => {
    try {
      const result = await fetchLeaderboard(); 
      
      if(result.first !=null){
        const firstUser = result.first.user;
        const firstTime = formatTime(result.first.time);
        document.getElementById('user-field-1').textContent = `1.  ${firstUser} ${firstTime}`;
      } else{
        document.getElementById('user-field-1').textContent ="1.  X";
      }

      if(result.second != null){
        const secondUser = result.second.user;
        const secondTime = formatTime(result.second.time);
        document.getElementById('user-field-2').textContent = `2.  ${secondUser} ${secondTime}`;
      }else{
        document.getElementById('user-field-2').textContent ="2.  X";
      }

      if(result.third != null){
        const thirdUser = result.third.user;
        const thirdTime = formatTime(result.third.time);
        document.getElementById('user-field-3').textContent = `3.  ${thirdUser} ${thirdTime}` ;
      }else{
        document.getElementById('user-field-3').textContent ="3. X";
      }
      
    } catch (error) {
      console.error('Error fetching best result:', error);
    }
  }
  

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  
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
  setBoardClicked(false);
  resetTimer();

  };

  const initializeNewBoard = async () => {
    try {
      console.log(user);
      setLoading(true);
      const data = await fetchBoardFromBackend();
      setInitialBoard(data.board);
      setBoard(data.board);
      setInitial(data);
      setInvalidCells([]);
      setBoardClicked(false);
      pauseTimer();
      resetTimer();
      difficulty();


    } catch (error) {
      console.log(error);
      serverError(error);
    } finally{
      setLoading(false);
    }
  }

  const difficulty = async () => {
    try {
      const data = await sudokuDifficulty(board);
      console.log(data);

      Swal.fire({
        position: "center",
        icon: "info",
        title: "SUDOKU IS "+ data,
        width: 450,
        background: `url('https://img.freepik.com/free-vector/abstract-horizontal-grid-lines-graph-style-graphic-design_1017-39918.jpg?size=626&ext=jpg&ga=GA1.1.34264412.1706745600&semt=ais')`,
        padding: "15px",
        timer: 1000,
        customClass: {
          title: 'pop-up'
        },
        showConfirmButton: false,
      });
    } catch (error) {
      serverError(error);
    }
  }
  const algorithmResult = () => {
    //resavanje table uz pomoc algoritma i dobijanje rezultata
  }

  const generateHardBoard = async () => {
    try {
      pauseTimer();
      resetTimer();
      const data = await fetchBoardFromBackendHard();
      console.log(data);
      setInitialBoard(data.board);
      setBoard(data.board);
      setInitial(data);
      setInvalidCells([]);

    } catch (error) {
      serverError(error);
    }
  }
  const generateMediumBoard = async () => {
    try {
      pauseTimer();
      resetTimer();
      const data = await fetchBoardFromBackendMedium();
      console.log(data);
      setInitialBoard(data.board);
      setBoard(data.board);
      setInitial(data);
      setInvalidCells([]);

    } catch (error) {
      serverError(error);
    }
  }
  const generateEasyBoard = async () => { 
    try {
      pauseTimer();
      resetTimer();
  
      const data = await fetchBoardFromBackendEasy();
      console.log(data);
      setInitialBoard(data.board);
      setBoard(data.board);
      setInitial(data);
      setInvalidCells([]);

    } catch (error) {
      serverError(error);
    }
  }

  const handleSolveSudoku = async (board) => {
    try {
      const data = await solveSud(board);
      console.log(data);
      if(data[1]!=null){
        setBoard(data);
        setInvalidCells([]);
        setBoardClicked(false);
        pauseTimer();
      }
      else{
        const dat= data[0];
    
        const slicedArray = [];
        for (let i = 0; i < 9; i++) {
            slicedArray.push(dat.slice(i * 9, (i + 1) * 9));
        }
          console.log(slicedArray);
          setBoard(slicedArray);
          setInvalidCells([]);
          setBoardClicked(false);
          pauseTimer();
      }

    
      } catch (error) {
        serverError(error);
      }
     

  }

  const handleLightbulbClick = () => {
    setTooltipContent(null);
    setIsLightbulbClicked(!isLightbulbClicked);

    setTimeout(() => {
      setIsLightbulbClicked(false);
      setTooltipContent(null);
    }, 20000);
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
          title: "SUDOKU IS SOLVED",
          width: 550,
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
          title: "SUDOKU IS NOT SOLVED",
          width: 550,
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

    setBoard(emptyBoard);
    setTimeout(() => {
      generateEasyBoard();
     }, 1000); 

  };

  return (
    <div>
      {loading && (
        <div>
          <div className='spinner-container'>
            <div className="spinner"></div>
          </div>
         
        </div>
      )}
      <div className='timer'>{formatTime(timer)}</div> 
      <div className="sudoku-container">

        <div className="additional-fields">
          <button className="button-check" onClick={initializeNewBoard} style={{ "width": "180px" }}>
            Initialize new board
          </button>
          <button className="button-check" onClick={algorithmResult} style={{ "width": "180px" }}>
            Algorithm result
          </button>
          <h2>BEST RESULT</h2>
          <div className='user'>
            <CiUser className="icon" style={{"cursor":"auto"}}/>
            <div id="user-field"></div>
          </div>
          <div className='user'>
            <CiTimer className="icon" style={{"cursor":"auto"}} />
            <div id="time-field"></div>
          </div>
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
                rowIndex = {rowIndex}
                columnIndex={columnIndex}
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
        
        <div className='right-bar'>
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
        <div className='leaderboard'>
            <h2>LEADERBOARD</h2>
            <div className='users'>
              <div id="user-field-1"></div>
              <div id="user-field-2"></div>
              <div id="user-field-3"></div>
            </div>
           
        </div>


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
