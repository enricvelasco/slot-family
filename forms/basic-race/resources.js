export const formInitialState = {
  player1: '',
  player2: '',
  laps: 20,
}

export const reducer = (state, action) => {
  const { type, payload } = action
  return {
    ...state,
    [type]: payload
  }
}
