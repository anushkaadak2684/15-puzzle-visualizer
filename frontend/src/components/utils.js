const MOVES = {
  0:[1,4],1:[0,2,5],2:[1,3,6],3:[2,7],
  4:[0,5,8],5:[1,4,6,9],6:[2,5,7,10],7:[3,6,11],
  8:[4,9,12],9:[5,8,10,13],10:[6,9,11,14],11:[7,10,15],
  12:[8,13],13:[9,12,14],14:[10,13,15],15:[11,14]
};

const GOAL = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];

export function generateRandomPuzzle(moves = 25) {
  let state = [...GOAL];
  for (let i = 0; i < moves; i++) {
    const zero = state.indexOf(0);
    const next = MOVES[zero][Math.floor(Math.random() * MOVES[zero].length)];
    [state[zero], state[next]] = [state[next], state[zero]];
  }
  return state;
}
