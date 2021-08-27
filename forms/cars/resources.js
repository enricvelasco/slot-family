export const formInitialState = {
  manufacturer: '',
  make: '',
  model: '',
  year: '',
  group: '',
  imageUrl: '',
  owner: '',
  sponsors: [],
  description: ''
}

export const reducer = (state, action) => {
  const { type, payload } = action
  return {
    ...state,
    [type]: payload
  }
}
