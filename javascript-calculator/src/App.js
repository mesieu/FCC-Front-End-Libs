import React, {useState, useEffect} from 'react'
import './App.css';

const buttons = [
  {"id": "clear", "value": "AC", "type": 'clear', 'className': 'bigButton'},
  {"id": "multiply", "value": "*", "type": 'operator', 'className': 'button'},
  {"id": "seven", "value": '7', "type": 'digit', 'className': 'button'},
  {"id": "eight", "value": '8', "type": 'digit', 'className': 'button'},
  {"id": "nine", "value": '9', "type": 'digit', 'className': 'button'},
  {"id": "divide", "value": "/", "type": 'operator', 'className': 'button'},
  {"id": "four", "value": '4', "type": 'digit', 'className': 'button'},
  {"id": "five", "value": '5', "type": 'digit', 'className': 'button'},
  {"id": "six", "value": '6', "type": 'digit', 'className': 'button'},
  {"id": "add", "value": "+", "type": 'operator', 'className': 'button'},
  {"id": "one", "value": '1', "type": 'digit', 'className': 'button'},
  {"id": "two", "value": '2', "type": 'digit', 'className': 'button'},
  {"id": "three", "value": '3', "type": 'digit', 'className': 'button'},
  {"id": "subtract", "value": "-", "type": 'operator', 'className': 'button'},
  {"id": "zero", "value": '0', "type": 'digit', 'className': 'button'},
  {"id": "decimal", "value": ".", "type": 'decimal', 'className': 'button'},
  {"id": "equals", "value": "=", "type": 'equals', 'className': 'mediumButton'}]

//* Calculator Component
const Calculator = () => {
  //States
  const [currentVal, setCurrentVal] = useState('0');
  const [currentEquation, setCurrentEquation] = useState('');
  const [wasEvaluated, setWasEvaluated] = useState(false);

  //* Regexes
  const isOperator = /[*+-/]/;
  const hasDecimalPoint = /\./;
  const endsWithOperatorsButNeg = /[*+/]$/;
  const endsWithTwoOps = /([*+-/]){2,}$/ 

  //* Functions
  const handleDigits = (val) => {
    if (wasEvaluated) {
      setCurrentEquation(val);
      setCurrentVal(val)
      setWasEvaluated(false);
    } else {
      currentVal === '0' || (isOperator.test(currentVal) && !hasDecimalPoint.test(currentVal))
       ? setCurrentVal(val) : setCurrentVal(currentVal + val);

      currentVal === '0' && val === '0' ? setCurrentEquation(val) : 
        currentEquation === '0' ? setCurrentEquation(val) : setCurrentEquation(currentEquation + val)
    }
  }

  const handleDecimals = (val) => {
    if(wasEvaluated){
      setCurrentVal('0' + val);
      setCurrentEquation('0' + val);
      setWasEvaluated(false);
    } if (currentVal === '0') {
        setCurrentVal(currentVal + val);
        setCurrentEquation('0' + val);
      } else if (isOperator.test(currentVal) && !hasDecimalPoint.test(currentVal)) {
        setCurrentVal('0' + val);
        setCurrentEquation(currentEquation + '0' + val)
      } else if (currentVal !== '0' && hasDecimalPoint.test(currentVal)) {
        return 
      } else {
        setCurrentVal(currentVal + val);
        setCurrentEquation(currentEquation + val);
    } 
  }

  const handleOperators = (val) => {
    console.log(endsWithTwoOps.test(currentEquation))
    if (wasEvaluated) {
      setCurrentEquation(currentVal + val);
      setCurrentVal(val);
      setWasEvaluated(false);
    } else {
      if (currentVal === '0' && isOperator.test(val)) {
        setCurrentEquation('0' + val)
        setCurrentVal(val);
      } else if (endsWithOperatorsButNeg.test(currentEquation) && val !== '-' ) {
        let previousEquation = currentEquation.slice(0, -1);
        setCurrentEquation(previousEquation + val);
        setCurrentVal(val);
      } else if (endsWithTwoOps.test(currentEquation)) {
        let previousEquation = currentEquation.slice(0, -2);
        setCurrentEquation(previousEquation + val);
        setCurrentVal(val);
      } else {
        setCurrentVal(val);
        setCurrentEquation(currentEquation + val);
      }
    }
      
  }

  const handleEquals = (val) => {
    setCurrentEquation(currentEquation + val);
    setCurrentVal(val);
    evaluateEquation(currentEquation);
  }

  const testEvaluateEquation = () => {
    setCurrentEquation('1*+-+1');
  }

  const evaluateEquation = (equation) => {
    equation = equation.replace(/--/, '+')
    equation = equation.replace()
    equation = equation.replace(endsWithOperatorsButNeg, '')
    console.log(equation);
    setCurrentVal(`${eval(equation)}`);
    setWasEvaluated(true);
  }

  const clearAllStates = () => {
    setCurrentVal('0');
    setCurrentEquation('');
  }
  useEffect(() => {
    clearAllStates();
  }, [])

  return (
    <div id='calculator'>
      <Equation currentEquation={currentEquation}/>
      <Display currentVal={currentVal}/>
      <div id='buttons'>
        {buttons.map((button, i) => {
          return (
            <Button
              id={button.id}
              value={button.value}
              type={button.type}
              className={button.className}
              key={i}
              handleDigits={handleDigits}
              handleOperators={handleOperators}
              handleEquals={handleEquals}
              handleDecimals={handleDecimals}
              clearVal={clearAllStates}
            />
          )
        })}
      </div>


    </div>
  );
}

//* Button Component
const Button = (props) => {
  const handleClick = () => {
    if (props.type === 'clear') {
      props.clearVal();
    } else if (props.type === 'digit'){
      props.handleDigits(props.value);
    } else if (props.type === 'decimal'){
      props.handleDecimals(props.value);
    } else if (props.type === 'operator'){
      props.handleOperators(props.value);
    } else if (props.type === 'equals') {
      props.handleEquals(props.value);
    }
  }
  return (
    <button id={props.id} className={props.className} onClick={handleClick}>
      {props.value}
    </button>
  )
}

//* Display Component
const Display = (props) => {
  return(
    <div id='display'>{props.currentVal}</div>
  )
}

//* Equation Component
const Equation = (props) => {
  return(
    <div id='equation'>{props.currentEquation}</div>
  )
}

export default Calculator;
