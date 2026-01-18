import { useState } from "react";
import Board from "./components/Board";
import Controls from "./components/Controls";
import ResultTable from "./components/ResultTable";
import PerformanceChart from "./components/PerformanceChart";
import { solvePuzzle } from "./api";
import { generateRandomPuzzle } from "./utils";
import "./App.css";

export default function App() {
  
  const [state, setState] = useState(generateRandomPuzzle(20));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const randomPuzzle = () => {
    setState(generateRandomPuzzle(20));
    setResult(null); 
  };

  const solve = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await solvePuzzle(state);
      setResult(res);
    } catch (err) {
      console.error("Solve failed:", err);
      alert("Failed to solve puzzle. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>15 Puzzle Algorithm Visualizer</h1>

      <Board state={state} setState={setState} />

      <Controls onSolve={solve} onRandom={randomPuzzle} loading={loading} />

      {result && (
        <div className="results">
          <ResultTable data={result} />
          <PerformanceChart data={result} />
        </div>
      )}
    </div>
  );
}
