export async function solvePuzzle(state) {
  try {
    const res = await fetch("https://15-puzzle-visualizer.vercel.app/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state })
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("API call failed:", err);
    return { error: err.message };
  }
}

