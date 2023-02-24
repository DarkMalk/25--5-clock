export function Length({ title, changeTime, type, time, formatTime }) {
  return (
    <div>
      <h3 className='text-center' id={`${type}-label`}>
        {title}
      </h3>
      <div className='grid'>
        <button id={`${type}-decrement`} onClick={() => changeTime(-60, type)}>
          <i className='fa-sharp fa-solid fa-arrow-down'></i>
        </button>
        <h3 id={`${type}-length`} className='text-center'>
          {formatTime(time)}
        </h3>
        <button id={`${type}-increment`} onClick={() => changeTime(60, type)}>
          <i className='fa-sharp fa-solid fa-arrow-up'></i>
        </button>
      </div>
    </div>
  )
}
