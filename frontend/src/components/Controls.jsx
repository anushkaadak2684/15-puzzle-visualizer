import React from "react";
export default function Controls({ onSolve, onRandom, loading }) {
  return (
    <div className="controls">
      <button onClick={onRandom} disabled={loading}>
        Random Puzzle
      </button>
      <button onClick={onSolve} disabled={loading}>
        {loading ? "Solving..." : "Solve & Compare"}
      </button>
    </div>
  );
}

