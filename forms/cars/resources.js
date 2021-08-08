export const formInitialState = {
  manufacturer: '',
  make: '',
  model: '',
  year: '',
  group: '',
  imgUrl: '',
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
