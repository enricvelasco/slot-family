const headers = new Headers()
headers.set('content-type', 'application/json')

export const startTrafficLights = async () => {
  const body = { type: 'test' }
  const url = new URL(`http://localhost:8080/start-traffic-light`)
  const { status } = await fetch(url, { method: 'POST', body: JSON.stringify(body), headers })
  return status
}

export const startYellowLight = async () => {
  const body = {}
  const url = new URL(`http://localhost:8080/start-yellow-light`)
  const { status } = await fetch(url, { method: 'POST', body: JSON.stringify(body), headers })
  return status
}
