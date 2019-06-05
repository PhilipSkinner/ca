import React, {Component} from 'react';
import logo from '../resources/logo.svg';

class Menu extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      selected : "authorities"
	    };
	}

	selectAuthorities() {
		this.setState({
			selected : 'authorities'
		});

		if (this.props.displayAuthorities) {
			this.props.displayAuthorities();
		}
	}

	selectSettings() {
		this.setState({
			selected : 'settings'
		});		

		if (this.props.displaySettings) {
			this.props.displaySettings();
		}
	}

	render() {
		const {
			selected
		} = this.state;

		let authoritiesClassName = 'nav-item';
		if (selected === 'authorities') {
			authoritiesClassName += ' active';
		}

		let settingsClassName = 'nav-item';
		if (selected === 'settings') {
			settingsClassName += ' active';
		}

		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			  <a className="navbar-brand">
			  	<img src={logo} className="logo" />
			  </a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			      <li className={authoritiesClassName}>
			        <a className="nav-link" onClick={this.selectAuthorities.bind(this)}>
			        	Authorities 
			        	{ 
		        			selected === 'authorities' 
		        			&& <span className="sr-only">(current)</span>
			        	}
			        </a>
			      </li>
			      <li className={settingsClassName}>
			        <a className="nav-link" onClick={this.selectSettings.bind(this)}>
			        	Settings
			        	{
			        		selected === 'settings'
			        		&& <span className="sr-only">(current)</span>
			        	}
		        	</a>
			      </li>
  			    </ul>			    
			  </div>
			</nav>
	  	);
	}
}

export default Menu;