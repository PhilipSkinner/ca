import React, {Component} from 'react';
import './resources/App.css';

import { 
  Menu,
  Authorities,
  Settings,  
  CAForm,  
  CADetails,
  CertificateDetails,
  CertificateForm,
  IntermediateDetails,
  IntermediateForm
} from './components';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selected        : "authorities",
        caId            : null,
        intermediateId  : null,
        certificateId   : null
      };
  }

  displayAuthorities() {
    this.setState({
      selected        : 'authorities',
      caId            : null,
      intermediateId  : null
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
    if (caId) {
      this.setState({
        caId            : caId
      });      
    }

    this.setState({
      selected        : 'caDetails',
      intermediateId  : null
    });
  }

  addIntermediate() {
    this.setState({
      selected : 'intermediateForm'      
    });
  }

  openIntermediate(intermediateId) {
    if (intermediateId) {
      this.setState({
        intermediateId  : intermediateId
      });  
    }

    this.setState({
      selected        : 'intermediateDetails',
      certificateId   : null
    });
  }

  addCertificate() {
    this.setState({
      selected : 'certificateForm'
    });
  }

  openCertificate(certificateId) {
    this.setState({
      selected      : 'certificateDetails',
      certificateId : certificateId
    })
  }

  render() {
    const {
      selected,
      caId,
      intermediateId,
      certificateId
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
          completed={this.displayAuthorities.bind(this)}
        />}
        {
          selected === 'caDetails' && <CADetails
            caId={caId}
            back={this.displayAuthorities.bind(this)}
            addIntermediate={this.addIntermediate.bind(this)}
            openIntermediate={this.openIntermediate.bind(this)}
          />
        }
        {
          selected === 'intermediateForm' && <IntermediateForm
            caId={caId}
            cancel={this.displayCA.bind(this)}
            completed={this.displayCA.bind(this)}
          />
        }
        {
          selected === 'intermediateDetails' && <IntermediateDetails
            caId={caId}
            intermediateId={intermediateId}
            back={this.displayCA.bind(this)}
            addCertificate={this.addCertificate.bind(this)}
            openCertificate={this.openCertificate.bind(this)}
          />
        }
        {
          selected === 'certificateForm' && <CertificateForm
            caId={caId}
            intermediateId={intermediateId}
            cancel={this.openIntermediate.bind(this)}
            complete={this.openIntermediate.bind(this)}
          />
        }
        {
          selected === 'certificateDetails' && <CertificateDetails
            caId={caId}
            intermediateId={intermediateId}
            certificateId={certificateId}
            back={this.openIntermediate.bind(this)}
          />
        }
        { selected === 'settings' && <Settings /> }
      </div>
    );
  } 
}

export default App;