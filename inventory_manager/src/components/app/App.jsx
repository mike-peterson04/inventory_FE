import './App.css';
import React, {Component} from 'react';
import LogWrap from '../logWrap/LogWrap'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      employeeRole:"no data"
    }
  }


  render(){
    if(this.state.employeeRole == "no data"){
      return (
      <div className="App">
        <LogWrap/>
      </div>
      );
    }
  }
}

export default App;
