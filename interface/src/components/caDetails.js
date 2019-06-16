import React, {Component} from 'react';

import Loader from './loader';
import Error from './error';

class CADetails extends Component {
	constructor(props) {
	    super(props);	    

	    this.state = {
	    	details 		: {},
	    	intermediaries 	: [],
	    	error 			: null,
	    	loading 		: true
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

	render() {	
		const {
			loading,
			error,
			details,
			intermediaries
		} = this.state;

		return (
			<div className="container pt-4">
				<div className="row">
					<div className="cadetails col-md-12">
						{
							loading && <Loader message="Fetching details..."/>
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
									<button className="btn btn-primary mr-4" onClick={this.addIntermediate.bind(this)}>Add Intermediate</button>
									<button className="btn btn-default" onClick={this.back.bind(this)}>Back</button>
								</div>
							</div>
						}

						{
							error === null && !loading && intermediaries.length === 0 &&
							<div className="card">
								<div className="card-body">
									<em>
										There are no Intermediates, why don't you create one?
									</em>
								</div>
							</div>
						}

						{
							error === null && !loading && intermediaries.length > 0 &&
							intermediaries.map((i) => {
								return (
									<div className="card card-hover col-md-3" onClick={this.openIntermediate.bind(this)(i.id)} key={i.id}>
										<div className="card-body">
											<h5 className="card-title">
												{i.subject.commonName}
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

export default CADetails;