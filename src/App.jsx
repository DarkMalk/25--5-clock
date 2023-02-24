import { useState } from 'react'
import { Length } from './components/Length'
import './assets/global.css'

function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60)
  const [breakTime, setBreakTime] = useState(5 * 60)
  const [sessionTime, setSessionTime] = useState(25 * 60)
  const [timerOn, setTimerOn] = useState(false)
  const [onBreak, setOnBreak] = useState(false)
  const [breakSound] = useState(new Audio('/beep-sound.mp3'))

  function playBreakSound() {
    breakSound.currentTime = 0
    breakSound.play()
  }

  const formatTime = time => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
  }

  function changeTime(amount, type) {
    if (type === 'break') {
      if (breakTime <= 60 && amount < 0) return
      setBreakTime(prev => prev + amount)
    } else {
      if (sessionTime <= 60 && amount < 0) return
      setSessionTime(prev => prev + amount)
      if (!timerOn) {
        setDisplayTime(sessionTime + amount)
      }
    }
  }

  function controlTime() {
    let second = 1000
    let date = new Date().getTime()
    let nextDate = new Date().getTime() + second
    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime()
        if (date > nextDate) {
          setDisplayTime(prev => {
            let onBreakVariable = onBreak

            if (prev <= 0 && !onBreakVariable) {
              playBreakSound()
              onBreakVariable = true
              setOnBreak(true)
              return breakTime
            } else if (prev <= 0 && onBreakVariable) {
              playBreakSound()
              onBreakVariable = false
              setOnBreak(false)
              return sessionTime
            }
            return prev - 1
          })
          nextDate += second
        }
      }, 30)
      localStorage.clear()
      localStorage.setItem('interval-id', interval)
    }
    if (timerOn) {
      clearInterval(localStorage.getItem('interval-id'))
    }
    setTimerOn(!timerOn)
  }

  function resetTime() {
    setDisplayTime(25 * 60)
    setBreakTime(5 * 60)
    setSessionTime(25 * 60)
    setTimerOn(false)
    setOnBreak(false)
    clearInterval(localStorage.getItem('interval-id'))
  }

  return (
    <div className='container'>
      <article>
        <div className='grid'>
          <Length title='Break Length' changeTime={changeTime} type='break' time={breakTime} formatTime={formatTime} />
          <Length
            title='Session Length'
            changeTime={changeTime}
            type='session'
            time={sessionTime}
            formatTime={formatTime}
          />
        </div>
        <h3 id='timer-label' className='text-center'>
          {onBreak ? 'Break' : 'Session'}
        </h3>
        <h1 id='time-left' className='text-center'>
          &#91; {formatTime(displayTime)} &#93;
        </h1>
        <div className='grid'>
          <button id='start_stop' onClick={controlTime}>
            <i className='fa-solid fa-play'></i>
          </button>
          <button id='reset' onClick={resetTime}>
            <i className='fa-sharp fa-solid fa-repeat'></i>
          </button>
        </div>
      </article>
    </div>
  )
}

export default App
