import './App.css';
import React from 'react';
import quotes from './quotes.json';


class QuoteBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quote: 'Hello !',
      author: 'Hello !'
    };
    // Binding this to the class methods
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }
  // Class methods(
  componentDidMount(){
    this.getRandomQuote()
  }

  getRandomQuote(){
    let randomIndex = Math.floor((Math.random() * quotes.quotes.length));
    this.setState({
      quote: `"${quotes.quotes[randomIndex].quote}"`,
      author: `- ${quotes.quotes[randomIndex].author}`
    })
  }
  

  // Render Component
  render() {
    return(
      <div id='container'>
        <div id='wrapper'>
          <div id='quote-box'>
            <div id='text'>{this.state.quote}</div>
            <div id='author'>{this.state.author}</div>
            <div id='buttons'>
              <a id='tweet-quote' href='twitter.com/intent/tweet'>
                <i id="twitter-icon" title="Tweet Quote." className="fab fa-twitter"></i>
              </a>
              <button id='new-quote'
                target='_blank' 
                title='New Quote.' 
                className='button' 
                onClick={this.getRandomQuote}>
                New Quote
              </button>
              </div>          
          </div>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <QuoteBox />
      </div>
      
    )
  }
}


export default App;
