import React from 'react';
import './Sudoku.css';
  const SudokuView = () => {

    const sudokuData = [
      [5, 3, null, 1, 7, null, null, null, null],
      [6, null, null, null, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9],
    ];
  
  
    return (
      <div className="sudoku-board">
       {sudokuData.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, columnIndex) => (
              <div key={columnIndex} className="sudoku-cell">
                {cell !== null ? cell : ' '} {/* Display ' ' for null cells */}
              </div>
            ))}
          </div>
        ))}

      </div>
    );
  };

export default SudokuView;
