import React, {Component} from 'react';
import './resources/App.css';

import { 
  Menu,
  Authorities,
  Settings,
  CAForm
} from './components';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selected : "authorities",
        caId     : null
      };
  }

  displayAuthorities() {
    this.setState({
      selected  : 'authorities',
      caId      : null
    });
  }

  displaySettings() {
    this.setState({
      selected : 'settings'
    })
  }

  displayAddCA() {
    this.setState({
      selected : 'CAForm'
    });
  }

  displayCA(caId) {
    this.setState({
      selected  : 'caDetails',
      caId      : caId
    });
  }

  render() {
    const {
      selected,
      caId
    } = this.state;

    return (
      <div className="App">
        <Menu 
          displayAuthorities={this.displayAuthorities.bind(this)}
          displaySettings={this.displaySettings.bind(this)}
        />

        { selected === 'authorities' && <Authorities 
          addCA={this.displayAddCA.bind(this)}
          openCA={this.displayCA.bind(this)}
        /> }
        { selected === 'CAForm' && <CAForm
          cancel={this.displayAuthorities.bind(this)}
          completed={this.displayCA.bind(this)}
        />}
        { selected === 'settings' && <Settings /> }
      </div>
    );
  } 
}

export default App;