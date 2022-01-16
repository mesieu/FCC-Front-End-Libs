import { toHaveAccessibleName } from '@testing-library/jest-dom/dist/matchers';
import {React, useState, useEffect} from 'react';
import './App.css';
import drumPadGroup from './padGroup'


// DrumPad Component
const DrumPad = (props) => {

  const playClip = () => {
    const audioClip = document.getElementById(props.drumPad.keyTrigger);
    audioClip.currentTime = 0;
    audioClip.play();
    props.updateDisplay(props.drumPad.id);
  }

  const keyPressed = (key) => {
    if (key.keyCode === props.drumPad.keyCode){
      playClip();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyPressed);
    return () => {
      window.removeEventListener("keydown", keyPressed);
    };
  }, );
  
  return (
    <button className='drum-pad' id={props.drumPad.id} onClick={playClip}>
      <audio className='clip' id={props.drumPad.keyTrigger} src={props.drumPad.src} type='audio/mp3'></audio>
      {props.drumPad.keyTrigger}
    </button>
  );
}

// App Component
const App = () => {

  const [currentDisplay, setCurrentDisplay] = useState("");
  const updateDisplay = (newDisplay) => {
    setCurrentDisplay(newDisplay);
  }

  return (
    <div id='drum-machine'>
      <div id='display'><p>{currentDisplay}</p></div>
      <div id='drumPads'>
        {drumPadGroup.pads.map((drumPad, drumPadIdx) => {
          return <DrumPad
          drumPad={drumPad}
          updateDisplay={updateDisplay}
          key={drumPadIdx}
          />
        })}
        </div>
    </div>
  )
}

export default App;

