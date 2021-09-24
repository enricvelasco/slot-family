import {serverUrl} from "../../env/env";

const headers = new Headers()
headers.set('content-type', 'application/json')

export const startLapSensors = async () => {
  const body = { type: 'test' }
  const url = new URL(`${serverUrl}/start-lap-sensors`)
  const { status } = await fetch(url, { method: 'POST', body: JSON.stringify(body), headers })
  return status
}

export const stopLapSensors = async () => {
  const body = { type: 'test' }
  const url = new URL(`${serverUrl}/stop-lap-sensors`)
  const { status } = await fetch(url, { method: 'POST', body: JSON.stringify(body), headers })
  return status
}
