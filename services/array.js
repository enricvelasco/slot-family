export const sortArrayByParam = (list, param) => {
  return list.sort((a, b) => {
    if (a[param] < b[param]) { return -1 }
    if (a[param] > b[param]) { return 1 }
    return 0
  })
}
