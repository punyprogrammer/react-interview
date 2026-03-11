import { useState } from "react";

const createMatrix = (n) =>
  Array.from({ length: n }, () => Array(n).fill(0));

const GridLights = ({ n = 3 }) => {
  const [grid, setGrid] = useState(() => createMatrix(n));

  const toggle = (matrix, r, c) => {
    if (r >= 0 && r < n && c >= 0 && c < n) {
      matrix[r][c] = matrix[r][c] === 0 ? 1 : 0;
    }
  };

  const updateCell = (row, col) => {
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r]);

      toggle(newGrid, row, col);
      toggle(newGrid, row - 1, col);
      toggle(newGrid, row + 1, col);
      toggle(newGrid, row, col - 1);
      toggle(newGrid, row, col + 1);

      return newGrid;
    });
  };

  return (
    <div>
      <h2>Grid Lights</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${n}, 50px)`,
          gap: "4px",
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              role="cell"
              onClick={() => updateCell(r, c)}
              style={{
                height: "50px",
                border: "1px solid black",
                backgroundColor: cell ? "gold" : "lightgray",
                cursor: "pointer",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GridLights;
