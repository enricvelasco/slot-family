export const formInitialState = {
  name: '',
  imageUrl: '',
  description: ''
}

export const reducer = (state, action) => {
  const { type, payload } = action
  return {
    ...state,
    [type]: payload
  }
}
