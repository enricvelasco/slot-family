import React, {useState, useEffect} from 'react'
import {convertMillisToTime} from "../../services/time";

const Chrono = ({ start = false }) => {
  const [timeFormat, setTimeFormat] = useState({minutes: 0, seconds: 0, millis: 0})
  const [time, setTime] = useState(0)
  const [milli, setMillis] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)

  useEffect(() => {
    // start && onCounter()
    !start && setTime(0)
  }, [start])

  useEffect(() => {
    setTimeFormat(convertMillisToTime(time))
  }, [time])

  const onCounter = () => {
    let myInterval = setInterval(() => {
      setTime(time + 1);
    }, 50)
    return ()=> {
      clearInterval(myInterval);
    };
  }

  useEffect(()=>{
    const myInterval = start && setInterval(() => {
      setTime(time + 1);
    }, 1)
    return ()=> {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      <h1> {timeFormat.minutes} : {timeFormat.seconds} : {timeFormat.millis}</h1>
    </div>
  )
}

export default Chrono
