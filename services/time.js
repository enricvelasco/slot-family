function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  const milliseconds = ((((millis % 60000) / 1000) % 1) * 1000).toFixed(0);
  return {minutes, seconds, milliseconds};
}

export const convertMillisToTime = decimalData => {
  const time = millisToMinutesAndSeconds(decimalData)
  return {minutes: time.minutes, seconds: time.seconds, millis: time.milliseconds}
}

export const getTotalTime = (list) => {
  if (!!list.length) {
    const totalTime = convertMillisToTime(list[list.length - 1].end - list[0].init)
    return {
      totalTime: `${totalTime.minutes}:${totalTime.seconds}:${totalTime.millis}`
    }
  }
}

export const getBestTime = (list) => {
  if (!!list.length) {
    let bestTime = null
    list.map(item => {
      const time = item.end - item.init;
      const setTime = (time) => {
        return time < bestTime ? time : bestTime
      }
      bestTime = bestTime ? setTime(time) : time
    })

    return convertMillisToTime(bestTime)

    /*const totalTime = convertMillisToTime(list[list.length - 1].end - list[0].init)
    return {
      totalTime: `${totalTime.minutes}:${totalTime.seconds}:${totalTime.millis}`
    }*/
  }
}

export const getFormattedTime = (list) => {
  const bestTime = getBestTime(list)
  console.log('BEST_TIME', bestTime)
  return {
    time: bestTime ? `${bestTime.minutes}:${bestTime.seconds}:${bestTime.millis}` : '-'
    // time: `AAAAA`
  }
}
