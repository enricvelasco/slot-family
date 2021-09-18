const headers = new Headers()
headers.set('content-type', 'application/json')

export const setBasicRace = async (data) => {
  const body = { data }
  const url = new URL(`http://localhost:8080/basic-race-info`)
  const { status } = await fetch(url, { method: 'POST', body: JSON.stringify(body), headers })
  return status
}
