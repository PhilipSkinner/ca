import React, {Component} from 'react';
import './resources/App.css';

import { 
  Menu,
  Authorities,
  Settings
} from './components';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selected : "authorities"
      };
  }

  displayAuthorities() {
    this.setState({
      selected : 'authorities'
    });
  }

  displaySettings() {
    this.setState({
      selected : 'settings'
    })
  }

  render() {
    const {
      selected
    } = this.state;

    return (
      <div className="App">
        <Menu 
          displayAuthorities={this.displayAuthorities.bind(this)}
          displaySettings={this.displaySettings.bind(this)}
        />

        { selected === 'authorities' && <Authorities /> }
        { selected === 'settings' && <Settings /> }
      </div>
    );
  } 
}

export default App;