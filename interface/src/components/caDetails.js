import React, {Component} from 'react';

import Loader from './loader';
import Error from './error';
import Modal from './modal';

class CADetails extends Component {
	constructor(props) {
	    super(props);	    

	    this.state = {
	    	details 		: {},
	    	intermediaries 	: [],
	    	error 			: null,
	    	loading 		: true,
	    	deleting 		: false
	    };
	}	

	componentDidMount() {
		const {
			caId 
		} = this.props;

		this.setState({
			loading : true
		});

		fetch(localStorage.getItem('apiroot') + '/ca/' + caId, {
			method : 'GET'
		})
		.then(res => res.json())
		.then((data) => {
			this.setState({
				details : data				
			});
			return fetch(localStorage.getItem('apiroot') + '/ca/' + caId + '/intermediate', {
				method : 'GET'
			});
		}).then(res => res.json())
		.then((data) => {
			this.setState({
				intermediaries : data,
				loading : false
			});
		}).catch((err) => {
			this.setState({
				error : err,
				loading : false
			});
		});
	}

	addIntermediate() {
		this.props && this.props.addIntermediate && this.props.addIntermediate();
	}

	back() {
		this.props && this.props.back && this.props.back();
	}

	openIntermediate(intermediateId) {
		return () => {
			this.props && this.props.openIntermediate && this.props.openIntermediate(intermediateId);	
		}		
	}

	removeCA() {
		this.setState({
			deleting : true
		});
	}

	doDelete() {
		const {
			caId 
		} = this.props;

		this.setState({
			loading : true
		});

		fetch(localStorage.getItem('apiroot') + '/ca/' + caId, {
			method : 'DELETE'
		}).then((data) => {
			this.setState({
				deleting : false,
				loading : false
			});
			//and go back
			this.back();	
		}).catch((err) => {
			this.setState({
				error : err,
				deleting : false,
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
			loading,
			error,
			details,
			intermediaries,
			deleting
		} = this.state;

		const children = intermediaries.map((i) => {
			return (
				<div className="card card-hover" onClick={this.openIntermediate.bind(this)(i.id)} key={i.id}>
					<div className="card-body">
						<h5 className="card-title">
							{i.subject.commonName}
						</h5>
						<h6 className="guid-text card-subtitle mb-2 text-muted">{i.id}</h6>
						<p className="card-text">
							Intermediate was issued at <strong>{new Date(i.issued).toLocaleDateString()}</strong> and expires at <strong>{new Date(i.expires).toLocaleDateString()}</strong>.
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
					<div className="cadetails col-md-12">
						{
							loading && <Loader message="Fetching details..."/>
						}

						{
							deleting && 
							<Modal 
								title="Confirm" 
								message="Are you sure you want to remove this CA? You will not be able to issue any new intermediaries or certificates with this CA once this operation has complete."
								saveButtonText="Yes"
								closeButtonText="No"
								onConfirm={this.doDelete.bind(this)}
								onCancel={this.cancelDelete.bind(this)}
							/>
						}

						{
							error !== null &&
							<Error error={error} />
						}

						{
							error === null && !loading &&
							<div className="col-md-12 pb-4">
								<div className="float-left">
									<h1 className="h3">{details.subject.commonName}</h1>
								</div>
								<div className="float-right">
									<button className="btn btn-danger mr-4" onClick={this.removeCA.bind(this)}>Remove CA</button>
									<button className="btn btn-primary mr-4" onClick={this.addIntermediate.bind(this)}>Add Intermediate</button>
									<button className="btn btn-default" onClick={this.back.bind(this)}>Back</button>
								</div>
								<div class="clear-fix"></div>
							</div>
						}

						{
							error === null && !loading && intermediaries.length === 0 &&
							<div className="alert alert-info">
								There are no Intermediates, why don't you create one?
							</div>
						}

						{
							error === null && !loading && intermediaries.length > 0 && wrapper							
						}
					</div>
				</div>
			</div>
	  	);
	}
}

export default CADetails;