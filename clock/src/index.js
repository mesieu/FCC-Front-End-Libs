import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const App = () => {
  const defaultLengths = { session: 25, break: 5, interval: 1000 };

  const [sessionLength, setSessionLength] = useState(
    defaultLengths.session * 60,
  );
  const [breakLength, setBreakLength] = useState(
    defaultLengths.break * 60,
  );
  const [timer, setTimer] = useState(sessionLength);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [startStopLabel, setStartStopLabel] = useState('Start');
  const [isRunning, setIsRunning] = useState(false);
  // const [sessionDone, setSessionDone] = useState(false);
  // const [breakDone, setBreakDone] = useState(false);

  const audioElement = useRef(null);

  const incrementSessionLength = () => {
    if (sessionLength === 60 * 60 || isRunning) return;
    setSessionLength(sessionLength + 1 * 60);
  };
  const decrementSessionLength = () => {
    if (sessionLength === 1 * 60 || isRunning) return;
    setSessionLength(sessionLength - 1 * 60);
  };
  const incrementBreakLength = () => {
    if (breakLength === 60 * 60 || isRunning) return;
    setBreakLength(breakLength + 1 * 60);
  };
  const decrementBreakLength = () => {
    if (breakLength === 1 * 60 || isRunning) return;
    setBreakLength(breakLength - 1 * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setStartStopLabel('Start');
    setTimerLabel('Session');
    setSessionLength(defaultLengths.session * 60);
    setTimer(sessionLength);
    setBreakLength(defaultLengths.break * 60);
    audioElement.current.pause();
    audioElement.current.currentTime = 0;
  };

  const startStopTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartStopLabel('Stop');
    } else {
      setIsRunning(false);
      setStartStopLabel('Start');
    }
  };

  const updateTimer = useCallback(() => {
    setTimer(timer - 1);
  }, [timer]);

  const controlTimer = useCallback(() => {
    if (timer === 1) {
      audioElement.current.play();
    }
    if (timer === 0 && timerLabel === 'Session') {
      setTimer(breakLength);
      setTimerLabel('Break');
    } else if (timer === 0 && timerLabel === 'Break') {
      setTimer(sessionLength);
      setTimerLabel('Session');
    }
  }, [breakLength, timer, timerLabel, sessionLength]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        updateTimer();
        controlTimer();
      }
    }, defaultLengths.interval);
    return () => clearInterval(interval);
  }, [isRunning, updateTimer, controlTimer, defaultLengths.interval]);

  useEffect(() => {
    setTimer(sessionLength);
  }, [sessionLength]);

  return (
    <div className="App">
      <div id="break-label">Break Length</div>
      <button id="break-decrement" onClick={decrementBreakLength}>
        -
      </button>
      <button id="break-increment" onClick={incrementBreakLength}>
        +
      </button>
      <div id="break-length">{`${breakLength / 60}`}</div>
      <div id="session-label">Session Length</div>
      <button id="session-decrement" onClick={decrementSessionLength}>
        -
      </button>
      <button id="session-increment" onClick={incrementSessionLength}>
        +
      </button>
      <div id="session-length">{`${sessionLength / 60}`}</div>
      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">
        {`${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(
          Math.round(((timer / 60) % 1) * 60),
        ).padStart(2, '0')}`}
      </div>
      <button id="start_stop" onClick={startStopTimer}>
        {startStopLabel}
      </button>
      <button id="reset" onClick={resetTimer}>
        Reset
      </button>
      <audio
        id="beep"
        ref={audioElement}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
