import React from 'react';
import Upload from './Upload';
import Result from './Result';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="inputForm">
        <div className="header"> Thai Food Image Classification </div>
        <Upload></Upload>
      </div>
      <div className="result">
        <Result></Result>
      </div>
    </div>
  );
}

export default App;
