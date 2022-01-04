//import logo from './logo.svg';
//import ReactDOM from 'react-dom';
import react from 'react';
import './App.css';

class QuoteBox extends react.Component {
  render(){
    return (
      <div className='container-fluid'>
        <div id="quote-box" className='well'>
          <div className='column'>
            <div className='row-xs-6'>
              <div id='text' className='text-center'>This is a random quote</div>
            </div>
            <div className='row-xs-6'>
              <div id='author' className='text-right'>By this author</div>
            </div>
            <div className='row-xs-6 text-right'>
              <button className='btn btn-primary'>New quote</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends react.Component {
  render(){
    return (
      <div>
        <QuoteBox />
      </div>
    )
  }
}


export default App;
