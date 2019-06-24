import React, {Component} from 'react';

class Error extends Component {
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