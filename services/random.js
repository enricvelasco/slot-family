export const generateRandomId = () => {
  const length = 8
  const timestamp = Date.now()

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  const ts = timestamp.toString()
  const parts = ts.split('').reverse()
  let id = ''

  for (let i = 0; i < length; ++i) {
    const index = getRandomInt(0, parts.length - 1)
    id += parts[index]
  }
  return id
}
