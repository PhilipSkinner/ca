import React, {Component} from 'react';

import Error from './error';
import Loader from './loader';

class CertificateDetails extends Component {
	constructor(props) {
	    super(props);	

	    this.state = {
	    	details : null,
	    	loading : true,
	    	error : null
	    }; 
	}	

	componentDidMount() {
		const {
			caId,
			intermediateId,
			certificateId
		} = this.props;

		this.setState({
			loading : true
		});

		fetch(localStorage.getItem('apiroot') + '/ca/' + caId + '/intermediate/' + intermediateId + '/cert/' + certificateId, {
			method : 'GET'
		})
		.then(res => res.json())
		.then((data) => {
			this.setState({
				details : data,
				loading : false		
			});
		}).catch((err) => {
			this.setState({
				error : err,
				loading : false
			});
		});
	}

	exportBundle() {
		
	}

	render() {	
		const {
			details,
			loading,
			error
		} = this.state;

		console.log(details);

		return (
			<div className="container pt-4">
				{
					loading && <Loader message="Loading certificate..."/>
				}

				{
					error && <Error error={error}/>
				}

				{
					!loading && !error &&
					<div>
						
					</div>
				}
			</div>
	  	);
	}
}

export default CertificateDetails;