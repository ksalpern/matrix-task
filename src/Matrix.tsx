import React, { useState } from "react";
import { useMatrixContext } from "./MatrixContext";

const Matrix: React.FC = () => {
  const { rows, cols } = useMatrixContext();
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [highlightedCells, setHighlightedCells] = useState<number[][]>([]);

  const generateMatrix = () => {
    const newMatrix = [];

    for (let i = 0; i < rows; i++) {
      const row = [];

      for (let j = 0; j < cols; j++) {
        row.push(Math.floor(Math.random() * 100));
      }

      newMatrix.push(row);
    }

    setMatrix(newMatrix);
  };

  //increase each cell on click
  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    const newMatrix = matrix.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        return row.map((cell, cIndex) => {
          if (cIndex === cellIndex) {
            return cell + 1;
          }
          return cell;
        });
      }
      return row;
    });
    setMatrix(newMatrix);
  };

  const findClosestCells = (
    matrix: number[][],
    rowIndex: number,
    cellIndex: number
  ): number[][] => {
    const currentCellValue = matrix[rowIndex][cellIndex];
    let closestValueDiff = Infinity;
    let closestCells: number[][] = [];

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (i === rowIndex && j === cellIndex) continue;

        const cellValue = matrix[i][j];
        const valueDiff = Math.abs(cellValue - currentCellValue);

        if (valueDiff < closestValueDiff) {
          closestValueDiff = valueDiff;
          closestCells = [[i, j]];
        } else if (valueDiff === closestValueDiff) {
          closestCells.push([i, j]);
        }
      }
    }

    return closestCells;
  };

  const handleCellMouseEnter = (rowIndex: number, cellIndex: number) => {
    const closestCells = findClosestCells(matrix, rowIndex, cellIndex);
    setHighlightedCells(closestCells);
  };

  const handleCellMouseLeave = () => {
    setHighlightedCells([]);
  };

  const handleAddRow = () => {
    const newRow: number[] = [];

    for (let i = 0; i < cols; i++) {
      newRow.push(Math.floor(Math.random() * 100));
    }

    setMatrix((prevMatrix) => [...prevMatrix, newRow]);
  };

  const handleDeleteRow = () => {
    const newMatrix = [...matrix];
    newMatrix.pop();
    setMatrix(newMatrix);
  };

  return (
    <div className="matrix">
      <div className="buttons">
        <button onClick={generateMatrix}>
          <span> Generate Matrix</span>
        </button>
        <button onClick={handleAddRow}>
          <span> Add Row</span>
        </button>
        <button onClick={handleDeleteRow}>
          <span> Delete Row</span>
        </button>
      </div>
      <table>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => {
                const isHighlighted = highlightedCells.some(
                  ([highlightedRowIndex, highlightedCellIndex]) =>
                    highlightedRowIndex === rowIndex &&
                    highlightedCellIndex === cellIndex
                );

                return (
                  <td
                    key={`cell-${rowIndex}-${cellIndex}`}
                    onClick={() => handleCellClick(rowIndex, cellIndex)}
                    onMouseEnter={() =>
                      handleCellMouseEnter(rowIndex, cellIndex)
                    }
                    onMouseLeave={handleCellMouseLeave}
                    style={{
                      background: isHighlighted ? "rgb(200 112 9)" : "",
                    }}
                  >
                    {cell}
                  </td>
                );
              })}
              <td>{row.reduce((a, b) => a + b)}</td>
            </tr>
          ))}
          <tr>
            {matrix.length > 0 &&
              matrix[0].map((_, index) => (
                <td key={`average-col-${index}`}>
                  {(
                    matrix.reduce((a, b) => a + b[index], 0) / matrix.length
                  ).toFixed(2)}
                </td>
              ))}
            <td>
              {matrix.length > 0 &&
                (
                  matrix.reduce(
                    (total, row) => total + row.reduce((a, b) => a + b),
                    0
                  ) /
                  (matrix.length * matrix[0].length)
                ).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Matrix;
