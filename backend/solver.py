from collections import deque
import heapq
import random

GOAL_STATE = tuple(range(1,16)) + (0,)

MOVES = {
    0:[1,4],1:[0,2,5],2:[1,3,6],3:[2,7],
    4:[0,5,8],5:[1,4,6,9],6:[2,5,7,10],7:[3,6,11],
    8:[4,9,12],9:[5,8,10,13],10:[6,9,11,14],11:[7,10,15],
    12:[8,13],13:[9,12,14],14:[10,13,15],15:[11,14]
}

def get_neighbors(state):
    zero = state.index(0)
    neighbors = []
    for move in MOVES[zero]:
        s = list(state)
        s[zero], s[move] = s[move], s[zero]
        neighbors.append(tuple(s))
    return neighbors

def manhattan(state):
    return sum(
        abs(i//4 - (GOAL_STATE.index(v)//4)) + abs(i%4 - (GOAL_STATE.index(v)%4))
        for i, v in enumerate(state) if v != 0
    )

def is_solvable(state):
    arr = [x for x in state if x != 0]
    inv_count = sum(1 for i in range(len(arr)) for j in range(i+1, len(arr)) if arr[i] > arr[j])
    blank_row = state.index(0) // 4
    return (inv_count + blank_row) % 2 == 1

def bfs(start, max_nodes=50000):
    queue = deque([(start, [])])
    visited = {start}
    nodes_expanded = 0
    while queue:
        state, path = queue.popleft()
        nodes_expanded += 1
        if state == GOAL_STATE:
            return path, nodes_expanded, len(visited)
        if nodes_expanded >= max_nodes:
            return None, nodes_expanded, len(visited)
        for n in get_neighbors(state):
            if n not in visited:
                visited.add(n)
                queue.append((n, path + [n]))
    return None, nodes_expanded, len(visited)

def dfs(start, depth_limit=25):
    stack = [(start, [], 0)]
    visited = {start}
    nodes_expanded = 0
    while stack:
        state, path, depth = stack.pop()
        nodes_expanded += 1
        if state == GOAL_STATE:
            return path, nodes_expanded, len(visited)
        if depth < depth_limit:
            for n in get_neighbors(state):
                if n not in visited:
                    visited.add(n)
                    stack.append((n, path + [n], depth + 1))
    return None, nodes_expanded, len(visited)

def astar(start):
    pq = [(manhattan(start), 0, start, [])]
    visited = set()
    nodes_expanded = 0
    while pq:
        _, g, state, path = heapq.heappop(pq)
        nodes_expanded += 1
        if state == GOAL_STATE:
            return path, nodes_expanded, len(visited)
        if state in visited:
            continue
        visited.add(state)
        for n in get_neighbors(state):
            heapq.heappush(pq, (g+1+manhattan(n), g+1, n, path+[n]))
    return None, nodes_expanded, len(visited)

def generate_random_puzzle(scramble_moves=25):
    state = list(GOAL_STATE)
    for _ in range(scramble_moves):
        zero = state.index(0)
        move = random.choice(MOVES[zero])
        state[zero], state[move] = state[move], state[zero]
    return state
