import React from 'react';

const SudokuCell = ({
  value,
  isSelected,
  isInvalid,
  onCellClick,
  onCellBlur,
}) => {
  const handleCellClick = () => {
    onCellClick();
  };

  const handleCellBlur = (e) => {
    onCellBlur(parseInt(e.target.innerText, 10) || 0);
  };

  return (
    <div
      className={`sudoku-cell ${
        isSelected ? 'selected' : ''
      } ${isInvalid ? 'invalid' : ''}`}
      contentEditable
      onClick={handleCellClick}
      onBlur={handleCellBlur}
    >
      {value !== 0 ? <span className={isInvalid ? 'invalid-number' : ''}>{value}</span> : ' '}
    </div>
  );
};

export default SudokuCell;
