export const formInitialState = {
  serverUrl: '',
  serverSocketUrl: '',
}

export const reducer = (state, action) => {
  const { type, payload } = action
  return {
    ...state,
    [type]: payload
  }
}
