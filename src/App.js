import React, { Component } from 'react';
import Search from './search';


const apiKey = '43bca0a4';




class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      dataReturned : [],
      city : []
    }
    
  }


  render() {
    return (
      <div className="App">
        <Search />
        
      </div>
    );
  }
}

export default App;
