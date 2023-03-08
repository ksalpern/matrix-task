import React, { useState } from "react";
import { useMatrixContext } from "./MatrixContext";

const Matrix: React.FC = () => {
  const { rows, cols } = useMatrixContext();
  const [matrix, setMatrix] = useState<number[][]>([]);

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

  return (
    <div className="matrix">
      <button onClick={generateMatrix}>
        <span> Generate Matrix</span>
      </button>
      <table>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  onClick={() => handleCellClick(rowIndex, cellIndex)}
                >
                  {cell}
                </td>
              ))}
              <td>{row.reduce((a, b) => a + b)}</td>
            </tr>
          ))}
          <tr>
            {matrix.length > 0 &&
              matrix[0].map((_, index) => (
                <td key={`average-col-${index}`}>
                  {matrix.reduce((a, b) => a + b[index], 0) / matrix.length}
                </td>
              ))}
            <td>
              {matrix.length > 0 &&
                matrix.reduce(
                  (total, row) => total + row.reduce((a, b) => a + b),
                  0
                ) /
                  (matrix.length * matrix[0].length)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Matrix;
