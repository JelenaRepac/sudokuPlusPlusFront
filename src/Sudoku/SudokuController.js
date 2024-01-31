

  export const fetchBoardFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:8080/board');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Sudoku board:', error.message);
      throw error;
    }
  };

  export const fetchBoardFromBackendHard= async () => {
    try {
      const response = await fetch('http://localhost:8080/board-hard');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching Sudoku board:', error.message);
      throw error;
    }
  };
  export const fetchBoardFromBackendMedium= async () => {
    try {
      const response = await fetch('http://localhost:8080/board-medium');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching Sudoku board:', error.message);
      throw error;
    }
  };
  export const fetchBoardFromBackendEasy= async () => {
    try {
      const response = await fetch('http://localhost:8080/board-easy');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching Sudoku board:', error.message);
      throw error;
    }
  };
  export const checkCellValue = async (board, rowIndex, columnIndex, value) => {
    try {
      const response = await fetch('http://localhost:8080/check-cell-value', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board: board,
          rowIndex: rowIndex,
          columnIndex: columnIndex,
          value: value,
        }),
        credentials: 'include',
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error checking cell value:', error);
      throw error;
    }
  };
  

  // export const checkSudokuValidity = async (board) => {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/if-valid', {
  //       mode: 'no-cors',
  //       method: 'POST',
  //       body: board, 
  //     });
  //     const result = await response.json();
  //     return result;
  //   } catch (error) {
  //     console.error('Error checking Sudoku validity:', error);
  //     throw error; 
  //   }
  // };

  export const solveSudoku = async () => {
    try {
      const response = await fetch('http://localhost:8080/solved');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Sudoku board:', error.message);
      throw error;
    }
  };