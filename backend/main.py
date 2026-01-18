from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from solver import bfs, dfs, astar, is_solvable
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://15-puzzle-visualizer-bdmz.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Puzzle(BaseModel):
    state: list[int]

@app.get("/")
def root():
    return {"message": "15 Puzzle Backend Running"}

@app.post("/solve")
def solve(data: Puzzle):
    start = tuple(data.state)


    if not is_solvable(start):
        return {"error": "Unsolvable puzzle"}

    results = {}
    for name, fn in [("BFS", bfs), ("DFS", dfs), ("A*", astar)]:
        t0 = time.time()
        path, nodes_expanded, memory = fn(start)
        results[name] = {
            "solved": path is not None,
            "steps": len(path) if path else None,
            "time": round(time.time() - t0, 4),
            "nodesExpanded": nodes_expanded,
            "memory": memory
        }

    return results
