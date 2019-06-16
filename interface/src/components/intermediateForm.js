import React, {Component} from 'react';

import Loader from './loader';
import Error from './error';

class IntermediateForm extends Component {
	constructor(props) {
	    super(props);	    

	    this.state = {
	    	loading 		: false,	    	
	    	intermediate 	: {},
	    	error 			: null
	    };
	}	

commonNameChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.intermediate);
			ret.commonName = event.target.value;
			return { 
				intermediate : ret
			};
		});
	}

	emailChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.intermediate);
			ret.email = event.target.value;
			return { 
				intermediate : ret
			};
		});
	}

	organisationChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.intermediate);
			ret.organisation = event.target.value;
			return { 
				intermediate : ret
			};
		});
	}

	organisationalUnitChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.intermediate);
			ret.organisationalUnit = event.target.value;
			return { 
				intermediate : ret
			};
		});
	}

	countryChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.intermediate);
			ret.country = event.target.value;
			return { 
				intermediate : ret
			};
		});
	}

	stateChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.intermediate);
			ret.state = event.target.value;
			return { 
				intermediate : ret
			};
		});
	}

	localityChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.intermediate);
			ret.locality = event.target.value;
			return { 
				intermediate : ret
			};
		});
	}

	validForChanged(event) {
		event.persist();

		this.setState((state) => {
			let ret = Object.assign({}, state.intermediate);
			ret.validFor = event.target.value;
			return { 
				intermediate : ret
			};
		});
	}

	saveIntermediate(event) {		
		event.preventDefault();

		this.setState({
			loading : true
		});

		const {
			caId
		} = this.props;

		fetch(localStorage.getItem('apiroot') + '/ca/' + caId + '/intermediate', {
			method : 'POST',
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(this.state.intermediate)
		}).then((res) => {
			this.props.completed(caId);
		}).catch((err) => {
			this.setState({
				error 	: err,
				loading : false
			})
		});
	}

	render() {	
		const {
			loading,
			intermediate,
			error
		} = this.state;

		return (
			<div className="container pt-4">
				<div className="row">
					<div className="intermediateForm col-md-12">
						{
							loading && <Loader message="Saving Intermediate..."/>
						}

						{
							error && <Error error={error} />
						}

						{
							!error && !loading &&
							<div className="card">
								<div className="card-body">
									<h1 className="h3">Create Intermediate</h1>

									<p>
										Complete the form below to generate your intermediate authority. You can use this intermediate to issue certificates that you can use in your applications.
									</p>

									<div className="border-top mt-4 pb-4" />

									<form onSubmit={this.saveIntermediate.bind(this)}>
										<div className="form-group">
											<label for="commonname">Common Name</label>
											<input 
												value={intermediate.commonName}
												onChange={this.commonNameChanged.bind(this)}
												id="commonname"
												type="text"
												required
												className="form-control"
												aria-describedby="commonNameHelp"
												placeholder="int.my.ca.com"
											/>
											<small id="commonNameHelp" className="form-text text-muted">Enter the common name for your intermediate.</small>
										</div>
										<div className="form-group">
											<label for="email">Email</label>
											<input
												value={intermediate.email}
												onChange={this.emailChanged.bind(this)}
												id="email"
												type="text"
												required
												className="form-control"
												aria-describedby="emailHelp"
												placeholder="your@email.com"
											/>
											<small id="emailHelp" className="form-text text-muted">Enter the email address for the intermediate.</small>
										</div>
										<div className="form-group">
											<label for="organisation">Organisation</label>
											<input
												value={intermediate.organisation}
												onChange={this.organisationChanged.bind(this)}
												id="organisation"
												type="text"
												required
												className="form-control"
												aria-describedby="organisationHelp"
												placeholder="Acme Inc."
											/>
											<small id="organisationHelp" className="form-text text-muted">Enter the organisation.</small>
										</div>
										<div className="form-group">
											<label for="organisationalUnit">Organisational Unit</label>
											<input
												value={intermediate.organisationalUnit}
												onChange={this.organisationalUnitChanged.bind(this)}
												id="organisationalUnit"
												type="text"
												required
												className="form-control"
												aria-describedby="organisationalUnitHelp"
												placeholder="Development"
											/>
											<small id="organisationalUnitHelp" className="form-text text-muted">Enter the organisation unit (OU).</small>
										</div>
										<div className="form-group">
											<label for="country">Country</label>
											<input
												value={intermediate.country}
												onChange={this.countryChanged.bind(this)}
												id="country"
												type="text"
												required
												className="form-control"
												aria-describedby="countryHelp"
												placeholder="GB"
											/>
											<small id="countryHelp" className="form-text text-muted">Enter the two digit country code.</small>
										</div>
										<div className="form-group">
											<label for="state">State (County)</label>
											<input
												value={intermediate.state}
												onChange={this.stateChanged.bind(this)}
												id="state"
												type="text"
												required
												className="form-control"
												aria-describedby="stateHelp"
												placeholder="Yorkshire"
											/>
											<small id="stateHelp" className="form-text text-muted">Enter the state/county name.</small>
										</div>
										<div className="form-group">
											<label for="locality">Locality</label>
											<input
												value={intermediate.locality}
												onChange={this.localityChanged.bind(this)}
												id="locality"
												type="text"
												required
												className="form-control"
												aria-describedby="localityHelp"
												placeholder="Leeds"
											/>
											<small id="localityHelp" className="form-text text-muted">Enter the locality (town etc).</small>
										</div>
										<div className="form-group">
											<label for="validFor">Valid For</label>
											<input
												value={intermediate.validFor}
												onChange={this.validForChanged.bind(this)}
												id="validFor"
												type="number"
												min="1"
												required
												className="form-control"
												aria-describedby="validForHelp"
												placeholder="3650"
											/>
											<small id="validForHelp" className="form-text text-muted">Enter the number of days this intermediate should be valid for (make this a largish number).</small>
										</div>
										<button type="submit" class="btn btn-primary">Create</button>
									</form>									
								</div>
							</div>
						}
					</div>
				</div>
			</div>
	  	);
	}
}

export default IntermediateForm;