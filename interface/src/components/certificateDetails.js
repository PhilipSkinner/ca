import React, {Component} from 'react';

import Error from './error';
import Loader from './loader';
import Modal from './modal';

class CertificateDetails extends Component {
	constructor(props) {
	    super(props);	

	    this.state = {
	    	details : null,
	    	loading : true,
	    	error : null,
	    	deleting : false
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

	back() {
		this.props && this.props.back && this.props.back();
	}

	remove() {
		this.setState({
			deleting : true
		});
	}

	reIssue() {

	}

	doDelete() {
		const {
			caId,
			intermediateId,
			certificateId
		} = this.props;

		this.setState({
			loading : true,
			deleting : false
		});

		fetch(localStorage.getItem('apiroot') + '/ca/' + caId + '/intermediate/' + intermediateId + '/cert/' + certificateId, {
			method : 'DELETE'
		})
		.then((data) => {
			this.setState({
				details : null,
				loading : false		
			});
			this.props && this.props.back && this.props.back();
		}).catch((err) => {
			this.setState({
				error : err,
				loading : false
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
			details,
			loading,
			error,
			deleting
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
					deleting && 
					<Modal 
						title="Confirm" 
						message="Are you sure you want to remove this certificate? You will not be able to export this certificate or re-issue it once it has been removed."
						saveButtonText="Yes"
						closeButtonText="No"
						onConfirm={this.doDelete.bind(this)}
						onCancel={this.cancelDelete.bind(this)}
					/>
				}

				{
					!loading && !error && details &&
					<div className="col-md-12 pb-4">
						<div className="float-left">
							<h1 className="h3">{details.subject.commonName}</h1>
						</div>
						<div className="float-right">
							<button className="btn btn-danger mr-4" onClick={this.remove.bind(this)}>Remove</button>
							<button className="btn btn-primary mr-4" onClick={this.reIssue.bind(this)}>Re-issue</button>
							<button className="btn btn-primary mr-4" onClick={this.exportBundle.bind(this)}>Get Bundle</button>
							<button className="btn btn-default" onClick={this.back.bind(this)}>Back</button>
						</div>
						<div className="clear-fix"></div>

						<div className="card mt-4">
							<div className="card-body">
								<h5 className="card-title">Certificate</h5>
								<div>
							    	<p><strong>Common Name</strong></p>
							    	<p>{details.subject.commonName}</p>
							    </div>
							    <div>
							    	<p><strong>Email</strong></p>
							    	<p>{details.subject.email}</p>
							    </div>
							    <div>
							    	<p><strong>Organisation</strong></p>
							    	<p>{details.subject.organisation}</p>
							    </div>
							    <div>
							    	<p><strong>Organisational Unit</strong></p>
							    	<p>{details.subject.organisationalUnit}</p>
							    </div>
							    <div>
							    	<p><strong>Town</strong></p>
							    	<p>{details.subject.town}</p>
							    </div>
							    <div>
							    	<p><strong>County/State</strong></p>
							    	<p>{details.subject.state}</p>
							    </div>
							    <div>
							    	<p><strong>Country</strong></p>
							    	<p>{details.subject.country}</p>
							    </div>
							</div>
						</div>

						<div className="card mt-4">
							<div className="card-body">
							    <h5 className="card-title">Issuer</h5>
							    <div>
							    	<p><strong>Common Name</strong></p>
							    	<p>{details.issuer.commonName}</p>
							    </div>
							    <div>
							    	<p><strong>Email</strong></p>
							    	<p>{details.issuer.email}</p>
							    </div>
							    <div>
							    	<p><strong>Organisation</strong></p>
							    	<p>{details.issuer.organisation}</p>
							    </div>
							    <div>
							    	<p><strong>Organisational Unit</strong></p>
							    	<p>{details.issuer.organisationalUnit}</p>
							    </div>
							    <div>
							    	<p><strong>Town</strong></p>
							    	<p>{details.issuer.town}</p>
							    </div>
							    <div>
							    	<p><strong>County/State</strong></p>
							    	<p>{details.issuer.state}</p>
							    </div>
							    <div>
							    	<p><strong>Country</strong></p>
							    	<p>{details.issuer.country}</p>
							    </div>
							</div>
						</div>					
					</div>
				}
			</div>
	  	);
	}
}

export default CertificateDetails;