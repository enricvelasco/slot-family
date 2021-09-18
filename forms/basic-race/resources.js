export const formInitialState = {
  player1: '',
  player1Car: '',
  player2: '',
  player2Car: '',
  laps: 20,
  isFinished: false,
}

export const reducer = (state, action) => {
  const { type, payload } = action
  return {
    ...state,
    [type]: payload
  }
}
