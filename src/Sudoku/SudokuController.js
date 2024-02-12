



  export const fetchBoardFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:8080/board');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
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
      throw error;
    }
  };
  export const getCellHints = async (board, rowIndex, columnIndex) => {
    try {
      const response = await fetch('http://localhost:8080/cell-hints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board: board,
          rowIndex: rowIndex,
          columnIndex: columnIndex,
        }),
        credentials: 'include',
      });
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  };
  export const checkIfNumberIsFilled = async (board, n) => {
    try {
      const response = await fetch('http://localhost:8080/number-filled', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board: board,
          n: n
        }),
        credentials: 'include',
      });
  
      const result = await response.json();
      console.log(result);
      return result.result;
    } catch (error) {
      throw error;
    }
  };
  
  export const solveSud = async (board) => {
    console.log(board);
    try {
      const response = await fetch('http://localhost:8080/solve-sudoku', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board: board
        }),
        credentials: 'include',
      });
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  export const sudokuDifficulty = async (board) => {
    console.log(board);
    try {
      const response = await fetch('http://localhost:8080/difficulty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board: board
        }),
        credentials: 'include',
      });
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  };

  export const insertTime = async (initialBoard,board, time, user) => {
    console.log(initialBoard);
    try {
      const response = await fetch('http://localhost:8080/time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          initialBoard: initialBoard,
          board: board,
          time: time,
          user: user
        }),
        credentials: 'include',
      });
      const result = await response.json();
    } catch (error) {
      throw error;
    }
  };
  

  export const checkSudokuValidity = async (board) => {
    try {
      const response = await fetch('http://localhost:8080/if-valid', {
        method: 'POST',
        body:  JSON.stringify({
          board
        }), 
      });
      const result = await response.json();
      return result;
    } catch (error) {
      throw error; 
    }
  };

  export const solveSudoku = async () => {
    try {
      const response = await fetch('http://localhost:8080/solved');
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchBestResult = async () => {
    try {
      const response = await fetch('http://localhost:8080/best-result');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:8080/leaderboard');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

 
  export const getPerformance = async (board) => {
    try {
      const response = await fetch('http://localhost:8080/performance', {
        method: 'POST',
        body:  JSON.stringify({
          board
        }), 
      });
      const result = await response.json();
      return result;
    } catch (error) {
      throw error; 
    }
  };