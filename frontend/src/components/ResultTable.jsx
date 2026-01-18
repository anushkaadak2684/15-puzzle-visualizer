import React from "react";

export default function ResultTable({ data }) {
  return (
    <table className="result-table">
      <thead>
        <tr>
          <th>Algorithm</th>
          <th>Solved</th>
          <th>Steps</th>
          <th>Time (s)</th>
          <th>Nodes Expanded</th>
          <th>Memory</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([algo, info]) => (
          <tr key={algo}>
            <td>{algo}</td>
            <td>{info.solved ? "✅" : "❌"}</td>
            <td>{info.steps ?? "-"}</td>
            <td>{info.time}</td>
            <td>{info.nodesExpanded}</td>
            <td>{info.memory}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

