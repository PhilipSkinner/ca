import React, {Component} from 'react';
import logo from '../resources/logo.svg';

class Error extends Component {
	constructor(props) {
	    super(props);
	}

	render() {
		const {
			error
		} = this.props;

		return (
			<div className="alert alert-danger" role="alert">
  				<p>
  					{error.toString()}
  				</p>

  				<small className="text-muted">
  					{error.stack}
  				</small>
			</div>
	  	);
	}
}

export default Error;