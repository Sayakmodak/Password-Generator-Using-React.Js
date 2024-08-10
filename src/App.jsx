import { React, useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [charLength, setcharLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isSpecialcharAllowed, setIsSpecialcharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const inputRef = useRef();

  // generating the password
  const passwordGenerator = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let number = '0123456789';
    let specialChar = '!@#$%^&*()';

    if (isNumberAllowed) {
      str += number;
    }
    if (isSpecialcharAllowed) {
      str += specialChar;
    }

    let actualPass = "";
    for (let i = 1; i <= charLength; i++) {
      let randomNumber = Math.floor(Math.random() * (str.length - 1) + 1);
      actualPass += str[randomNumber];
    }
    setPassword(actualPass);
    console.log(password);
  }, [charLength, isNumberAllowed, isSpecialcharAllowed]);

  // copy to clipboard 
  const copyToClipBoard = useCallback(() => {
    inputRef.current.select();
    inputRef.current.setSelectionRange(0, 99999);
    window.navigator.clipboard.writeText(password);

    let tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + textInput.value;

  }, [password]);

  // mouse out from the button 
  function outFunc() {
    let tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
  }

  // after the page load password generator function should be run automatically
  useEffect(() => {
    passwordGenerator();
  }, [charLength, isNumberAllowed, isSpecialcharAllowed, passwordGenerator]);

  return (
    <>
      <h3>Password Generator</h3>
      <label htmlFor="textInput">Password</label>
      <input type="text" value={password} id='textInput' readOnly ref={inputRef} />

      <div className="tooltip">
        <button onClick={copyToClipBoard} onMouseOut={outFunc}>
          <span className="tooltiptext" id="myTooltip">Copy to clipboard</span>
          Copy Password</button></div>

      <p>{charLength}</p>
      <input type="range" min={6} max={100} value={charLength} onChange={(e) => {
        setcharLength(e.target.value);
      }} />

      <label htmlFor="numbercheckbox">Number</label><input id="numbercheckbox" type="checkbox" defaultChecked={isNumberAllowed} onChange={(e) => {
        setIsNumberAllowed(!isNumberAllowed);
      }} />

      <label htmlFor="charactercheckbox">character</label><input type="checkbox" id='charactercheckbox' defaultChecked={isSpecialcharAllowed} onChange={(e) => {
        setIsSpecialcharAllowed(!isSpecialcharAllowed);
      }} />
    </>
  )
}

export default App
