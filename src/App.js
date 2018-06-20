import React, { Component } from 'react';
import Search from './search';
import Display from './Display';


const apiKey = '43bca0a4';




class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      year: '',
      type: '',
      title: '',
      openSearch: 1,
      openDisplay: 0,
      responseObject: []
    }
    
  }


  render() {
    return (
      <div className="App">
        {this.state.openSearch && <Search />}
        {this.state.openDisplay && <Display />}

      </div>
    );
  }
}

export default App;
