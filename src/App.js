import React from 'react';
import Upload from './Upload';
import Result from './Result';
import './App.css';

class App extends React.Component{

  state = {
    predictResult: []
  }

  result = <div></div>
  
  setPredictResult = result => {
    this.setState({predictResult: result})
  }

  render(){
    if(this.state.predictResult.length !== 0){
      this.result = <div className="result">
          <Result predictResult={this.state.predictResult}></Result>
      </div>
    }

    return (
      <div className="App">
        <div className="inputForm">
          <div className="header"> Thai Food Image Classification </div>
          <Upload setPredictResult={this.setPredictResult.bind(this)}></Upload>
        </div>
        {this.result}      
      </div>
    );
  }
}

export default App;
