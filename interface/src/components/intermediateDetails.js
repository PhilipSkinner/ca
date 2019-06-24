import React, {Component} from 'react';

import Loader from './loader';
import Error from './error';
import Modal from './modal';

class IntermediateDetails extends Component {
	constructor(props) {
	    super(props);	    

	    this.state = {
	    	details 		: {},
	    	certificates 	: [],
	    	error 			: null,
	    	loading 		: true,
	    	deleting 		: false
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

	back() {
		this.props && this.props.back && this.props.back();
	}

	remove() {
		this.setState({
			deleting : true
		});
	}

	doDelete() {
		const {
			caId,
			intermediateId
		} = this.props;

		this.setState({
			loading : true
		});

		fetch(localStorage.getItem('apiroot') + '/ca/' + caId + '/intermediate/' + intermediateId, {
			method : 'DELETE'
		}).then((data) => {
			this.setState({
				deleting : false,
				loading : false
			});
			this.back();
		}).catch((err) => {
			this.setState({
				error : err,
				loading : false,
				deleting : false
			});
		});
	}

	cancelDelete() {
		this.setState({
			deleting : false
		});
	}

	render() {	
		const {
			loading,
			error,
			details, 
			certificates,
			deleting
		} = this.state;

		const children = certificates.map((c) => {
			return (
				<div className="card card-hover" onClick={this.openCertificate.bind(this)(c.id)} key={c.id}>
					<div className="card-body">
						<h5 className="card-title">
							{c.subject.commonName}
						</h5>
						<h6 className="guid-text card-subtitle mb-2 text-muted">{c.id}</h6>
						<p className="card-text">
							Certificate was issued at <strong>{new Date(c.issued).toLocaleDateString()}</strong> and expires at <strong>{new Date(c.expires).toLocaleDateString()}</strong>.
						</p>
					</div>
				</div>
			);
		});

		const wrapper = (
			<div className="card-columns">
				{children}
			</div>
		);

		return (
			<div className="container pt-4">
				<div className="row">
					<div className="intermediateDetails col-md-12">
						{
							loading && <Loader message="Fetching details..."/>
						}

						{
							deleting && 
							<Modal 
								title="Confirm" 
								message="Are you sure you want to remove this intermediate? You will not be able to issue any new certificates with this intermediate once this operation has complete."
								saveButtonText="Yes"
								closeButtonText="No"
								onConfirm={this.doDelete.bind(this)}
								onCancel={this.cancelDelete.bind(this)}
							/>
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
									<button className="btn btn-danger mr-4" onClick={this.remove.bind(this)}>Remove</button>
									<button className="btn btn-primary mr-4" onClick={this.addCertificate.bind(this)}>Add Certificate</button>
									<button className="btn btn-default" onClick={this.back.bind(this)}>Back</button>
								</div>
								<div className="clear-fix"></div>
							</div>
						}

						{
							error === null && !loading && certificates.length === 0 &&
							<div className="alert alert-info">
								There are no Certificates, why don't you create one?
							</div>
						}

						{
							error === null && !loading && certificates.length > 0 && wrapper
						}
					</div>
				</div>
			</div>
	  	);
	}
}

export default IntermediateDetails;