export const formInitialState = {
  player1: '',
  player1Car: '',
  player2: '',
  player2Car: '',
  laps: 20,
  isFinished: false,
  player1Laps: -1,
  player2Laps: -1
}

export const basicRaceInitialState = {
  player1Laps: null,
  player2Laps: null,
  finished: false,
}

export const reducer = (state, action) => {
  const { type, payload } = action
  return {
    ...state,
    [type]: payload
  }
}
