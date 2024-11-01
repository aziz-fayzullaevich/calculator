import { useEffect, useState } from 'react';
import './style.css';

const App = () => {
  const [inputNum, setInputNum] = useState('');
  const [calcNum, setCalcNum] = useState(null);
  const [operator, setOperator] = useState('');
  const [monitor, setMonitor] = useState('0');

  useEffect(() => {
    if (calcNum !== null) {
      setMonitor(`${calcNum} ${operator} ${inputNum !== '' ? inputNum : ''}`);
    } else {
      setMonitor(inputNum !== '' ? inputNum : '0');
    }
  }, [inputNum, calcNum, operator]);

  const takeInputName = (num) => {
    if (inputNum === '0' && num !== '.') {
      setInputNum(num.toString());
    } else {
      setInputNum(prev => prev + num);
    }
  };

  const takeOperator = (op) => {
    if (operator && inputNum !== '') {
      calculate();
    } else {
      setCalcNum(parseFloat(inputNum));
    }
    setOperator(op);
    setInputNum('');
  };

  const calculate = () => {
    if (calcNum === null || inputNum === '') return;

    let result;

    const currentInput = parseFloat(inputNum);
    switch (operator) {
      case '+':
        result = calcNum + currentInput;
        break;
      case '-':
        result = calcNum - currentInput;
        break;
      case '*':
        result = calcNum * currentInput;
        break;
      case '/':
        result = currentInput === 0 ? 'Error' : calcNum / currentInput;
        break;
      default:
        return;
    }

    setCalcNum(result);
    setInputNum('');
    setOperator('');
  };

  const getEquation = () => {
    calculate();
    setOperator('');
  };

  const clear = () => {
    setInputNum('');
    setCalcNum(null);
    setOperator('');
    setMonitor('0');
  };

  return (
    <div className="calculator">
      <section className="monitor">
        <p className="out-put">{monitor}</p>
      </section>

      <section className="keyboards">
        <div className="keyboard-row">
          <button onClick={clear} className="one-block blue">AC</button>
          <button className="one-block blue">-/+</button>
          <button className="one-block blue">%</button>
          <button onClick={() => takeOperator('/')} className="one-block red">/</button>
        </div>

        <div className="keyboard-row">
          <button onClick={() => takeInputName(7)} className="one-block">7</button>
          <button onClick={() => takeInputName(8)} className="one-block">8</button>
          <button onClick={() => takeInputName(9)} className="one-block">9</button>
          <button onClick={() => takeOperator('*')} className="one-block red">*</button>
        </div>

        <div className="keyboard-row">
          <button onClick={() => takeInputName(4)} className="one-block">4</button>
          <button onClick={() => takeInputName(5)} className="one-block">5</button>
          <button onClick={() => takeInputName(6)} className="one-block">6</button>
          <button onClick={() => takeOperator('-')} className="one-block red">-</button>
        </div>

        <div className="keyboard-row">
          <button onClick={() => takeInputName(1)} className="one-block">1</button>
          <button onClick={() => takeInputName(2)} className="one-block">2</button>
          <button onClick={() => takeInputName(3)} className="one-block">3</button>
          <button onClick={() => takeOperator('+')} className="one-block red">+</button>
        </div>

        <div className="keyboard-row">
          <button onClick={() => takeInputName(0)} className="two-block">0</button>
          <button onClick={() => takeInputName('.')} className="one-block">.</button>
          <button onClick={getEquation} className="one-block red">=</button>
        </div>
      </section>
    </div>
  );
};

export default App;