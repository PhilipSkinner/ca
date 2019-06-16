import React, {Component} from 'react';

import Loader from './loader';
import Error from './error';

class IntermediateDetails extends Component {
	constructor(props) {
	    super(props);	    

	    this.state = {
	    	details 		: {},
	    	certificates 	: [],
	    	error 			: null,
	    	loading 		: true
	    };
	}	

	componentDidMount() {
		const {
			caId,
			intermediateId
		} = this.props;

		this.setState({
			loading : true
		});

		fetch(localStorage.getItem('apiroot') + '/ca/' + caId + '/intermediate/' + intermediateId, {
			method : 'GET'
		}).then(res => res.json())
		.then((data) => {
			this.setState({
				details : data
			});
			return fetch(localStorage.getItem('apiroot') + '/ca/' + caId + '/intermediate/' + intermediateId + '/cert', {
				method : 'GET'
			});
		}).then(res => res.json())
		.then((data) => {
			this.setState({
				certificates : data,
				loading : false
			});
		}).catch((err) => {
			this.setState({
				error : err,
				loading : false
			});
		});
	}

	addCertificate() {
		this.props && this.props.addCertificate && this.props.addCertificate();
	}

	openCertificate(certificateId) {
		return () => {
			this.props && this.props.openCertificate && this.props.openCertificate(certificateId);
		};		
	}

	render() {	
		const {
			loading,
			error,
			details, 
			certificates
		} = this.state;

		return (
			<div className="container pt-4">
				<div className="row">
					<div className="intermediateDetails col-md-12">
						{
							loading && <Loader message="Fetching details..."/>
						}

						{
							error !== null &&
							<Error error={error}/>
						}

						{
							error === null && !loading &&
							<div className="col-md-12 pb-4">
								<div className="float-left">
									<h1 className="h3">{details.subject.commonName}</h1>
								</div>
								<div className="float-right">
									<button className="btn btn-primary mr-4" onClick={this.addCertificate.bind(this)}>Add Certificate</button>
								</div>
							</div>
						}

						{
							error === null && !loading && certificates.length === 0 &&
							<div className="card">
								<div className="card-body">
									<em>
										There are no Certificates, why don't you create one?
									</em>
								</div>
							</div>
						}

						{
							error === null && !loading && certificates.length > 0 &&
							certificates.map((c) => {
								return (
									<div className="card card-hover col-md-3" onClick={this.openCertificate.bind(this)(c.id)} key={c.id}>
										<div className="card-body">
											<h5 className="card-title">
												{c.subject.commonName}
											</h5>
										</div>
									</div>
								);
							})
						}
					</div>
				</div>
			</div>
	  	);
	}
}

export default IntermediateDetails;