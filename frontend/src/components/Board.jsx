import React from "react";

export default function Board({ state, setState }) {

  const handleClick = (index) => {
    const zeroIndex = state.indexOf(0);

    const moves = [
      zeroIndex - 4, // up
      zeroIndex + 4, // down
      zeroIndex - 1, // left
      zeroIndex + 1, // right
    ].filter((i) => i >= 0 && i < 16);

    if (moves.includes(index)) {
      const newState = [...state];
      [newState[zeroIndex], newState[index]] = [
        newState[index],
        newState[zeroIndex],
      ];
      setState(newState);
    }
  };

  return (
    <div className="board">
      {state.map((v, i) => (
        <div
          key={i}
          className={`tile ${v === 0 ? "blank" : ""}`}
          onClick={() => handleClick(i)}
        >
          {v !== 0 && v}
        </div>
      ))}
    </div>
  );
}

