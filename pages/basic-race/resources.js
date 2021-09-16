export const formInitialState = {
  player1Laps: '0',
  player2Laps: '0',
}

export const reducer = (state, action) => {
  const { type, payload } = action
  return {
    ...state,
    [type]: payload
  }
}
