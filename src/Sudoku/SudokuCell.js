// SudokuCell.js
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const SudokuCell = ({ value, isSelected, onCellClick, onCellBlur, isEditable }) => {
    const cellClasses = classNames({
        'editable': isEditable, // Add this class for editable cells
      });
  const [content, setContent] = useState(value === 0 ? '' : value.toString());

  useEffect(() => {
    setContent(value === 0 ? '' : value.toString());
  }, [value]);

  const handleInput = (e) => {
    if (isEditable) {
      const newValue = e.target.innerText;
      setContent(newValue);
    }
  };

  return (
    <div
      className={classNames('sudoku-cell', { selected: isSelected, editable: isEditable })}
      contentEditable={isEditable}
      onClick={onCellClick}
      onBlur={(e) => onCellBlur(parseInt(e.target.innerText, 10) || 0)}
      onInput={handleInput}
    >
      {content}
    </div>
  );
};

export default SudokuCell;
