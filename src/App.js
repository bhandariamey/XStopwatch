import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);    
    
  }, [isActive]);

  const handleToggle = () => {
    setIsActive(prevIsActive => !prevIsActive);
  };

  const handleReset = () => {
    setSeconds(0);
    setMinutes(0);
    setIsActive(false);
  };

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes(prevMinutes => prevMinutes + 1);
    }
  }, [seconds]);

  return (
    <div className={styles.wrapper}>
      <h1>Stopwatch</h1>
      <p>{`Time: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</p>
      <div className={styles.buttons}>
        <button onClick={handleToggle}>{isActive ? 'Stop' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
