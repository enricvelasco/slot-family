export const formInitialState = {
  manufacturer: '',
  constructor: '',
  model: '',
  year: '',
  group: '',
  imageUrl: '',
  commercialImage: '',
  owner: '',
  sponsors: [],
  description: ''
}

export const formInitialOptions = {
  manufacturerList: [],
  constructorList: [],
  sponsorsList: [],
  championshipTypesList: []
}

export const reducer = (state, action) => {
  const { type, payload } = action
  return {
    ...state,
    [type]: payload
  }
}
