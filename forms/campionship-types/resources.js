export const formInitialState = {
  name: '',
  order: 0,
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
