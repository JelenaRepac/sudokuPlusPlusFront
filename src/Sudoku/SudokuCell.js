// SudokuCell.js
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const SudokuCell = ({ value, isSelected, onCellClick, onCellBlur, isEditable, isInitial, isInvalid }) => {
  const cellClasses = classNames({
    'editable': isEditable,
    'initial': isInitial,
    'selected': isSelected,
    'invalid': isInvalid
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
  const handleBlur = (e) => {
    const newValue = parseInt(e.target.innerText, 10) || 0;
    onCellBlur(newValue);
  };

  return (
    <div
      className={classNames('sudoku-cell', cellClasses)}
      contentEditable={isEditable}
      onClick={onCellClick}
      onBlur={handleBlur}
      onInput={handleInput}
    >
      {content}
    </div>
  );
};

export default SudokuCell;
