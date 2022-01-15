import React, { useState, useEffect } from 'react';
import {marked}  from 'marked'
import './styles.css';
import placeholder from './placeholder.js'

// Set options so that carriages returns are rendered as <br>
marked.setOptions({
  gfm: true,
  breaks: true
})

// App
const App = () => {

  //State Variables
  const [input, setInput] = useState('');
            
  // Loads placeholder string in the text area when the component mounts          
  useEffect(() => {
    setInput(placeholder)
  }, [])
  
  //Handle textarea onChange event.
  const onChange = (event) => {
    setInput(event.target.value);
  }

  return ( 
  <div id='container'>
    <div className='box'>
      <div className='boxHeader'>Editor</div>
      <textarea 
        id='editor' 
        value={input} 
        onChange={onChange}>
      </textarea>
    </div>
    <div className='box'>
      <div className='boxHeader'>Preview</div>
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(input)}}></div>
    </div>
  </div>
  )
}

export default App;

