import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Sudoku.css';
  const SudokuView = () => {
    const [board, setboard] = useState([]);
    const [invalidCells, setInvalidCells] = useState([]);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [selectedCell, setSelectedCell] = useState(null);

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
  
      //fetchboard();
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
    }, []);
    const handleCellClick = (rowIndex, columnIndex) => {
      setSelectedNumber(board[rowIndex][columnIndex]);
      setSelectedCell({ rowIndex, columnIndex });
    };
    const checkCellValue = async (rowIndex, columnIndex, value) => {
    
      try {
     
        const response = await fetch('http://localhost:8080/api/check-cell-value', {
          method: 'POST',
          body: board+","+rowIndex+","+columnIndex+","+value
        });
    
        const result = await response.json();
        return result;
      } catch (error) {
        console.error('Error checking cell value:', error);
        return false;
      }
    };
    const handleChange = async ( rowIndex, columnIndex,value) => {
      
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
  
  
    //CHECK WHOLE BOARD VALIDITY
    const checkSudokuValidity = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/if-valid', {
          mode:'no-cors',
          method: 'POST',
        
          body: board , // Send board directly, not within params
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error('Error checking Sudoku validity:', error);
      }
    };
    
    return (
      <div className="sudoku-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, columnIndex) => (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className={`sudoku-cell ${
                  (selectedCell &&
                    (selectedCell.rowIndex === rowIndex || selectedCell.columnIndex === columnIndex)) ||
                  (selectedNumber && cell === selectedNumber)
                    ? 'selected'
                    : ''
                } ${
                  invalidCells.some(
                    (invalidCell) =>
                      invalidCell[0] === rowIndex && invalidCell[1] === columnIndex
                  )
                    ? 'invalid'
                    : ''
                }`}
                contentEditable
                onClick={() => handleCellClick(rowIndex, columnIndex)}
                onBlur={(e) =>
                  handleChange(
                    rowIndex,
                    columnIndex,
                    parseInt(e.target.innerText, 10) || 0
                  )
                }
              >
                {cell !== 0 ? (
                  <span
                    className={`${
                      invalidCells.some(
                        (invalidCell) =>
                          invalidCell[0] === rowIndex && invalidCell[1] === columnIndex
                      )
                        ? 'invalid-number'
                        : ''
                    }`}
                  >
                    {cell}
                  </span>
                ) : (
                  ' '
                )}
              </div>
            ))}
          </div>
        ))}
        <button onClick={checkSudokuValidity} className="button-check">
          Check Validity
        </button>
      </div>
    );
  };
  
export default SudokuView;
