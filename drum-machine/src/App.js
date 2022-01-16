import {React, useState, useEffect} from 'react';
import './App.css';
import drumPadGroup from './padGroup'



const DrumPad = (props) => {

  const playClip = () => {
    const clip = document.getElementById(props.drumPad.trigger);
    clip.currentTime = 0;
    clip.play(); 
  }

  return (
    <button id={props.drumPad.id} onClick={playClip}>
      {props.drumPad.trigger}
      <audio id={props.drumPad.trigger} src={props.drumPad.url} type='audio/wav'></audio>
    </button>
  );
}

const App = () => {
  return (
    <div>
      {drumPadGroup.pads.map((drumPad) => {
        return <DrumPad drumPad={drumPad} />
      })}
    </div>
  )
}

export default App;
