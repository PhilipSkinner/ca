import React, {Component} from 'react';

import Error from './error';
import Loader from './loader';

class Authorities extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      authorities 	: [],
	      error 		: null,
	      loading 		: false
	    };
	}

	componentDidMount() {
		this.setState({
			loading : true
		});

        fetch(localStorage.getItem('apiroot') + '/ca', {
        	method : 'GET'
        })
        .then(res => res.json())
        .then((data) => {
			this.setState({ 
				authorities : data,
				loading 	: false
			});
        })
        .catch((err) => {
        	this.setState({
        		error 	: err,
        		loading : false
        	});
        });
	}

	caSelected(id) {
		return (event) => {
			this.props.openCA(id);
		}
	}

	addCA(event) {
		this.props.addCA();
	}

	render() {
		const {
			error,
			authorities,
			loading
		} = this.state;

		return (
			<div className="container pt-4">
				<div className="row">
					<div className="authorities col-md-12">
						{
							loading && <Loader message="Fetching authorities..."/>
						}

						{ 
							error !== null && 
							<Error error={error} />
						}

						{
							error === null && !loading &&
							<div className="col-md-12 pb-4">
								<div className="float-left">
									<h1 className="h3">Authorities</h1>
								</div>
								<div className="float-right">
									<button className="btn btn-primary mr-4" onClick={this.addCA.bind(this)}>Add Authority</button>
									<button className="btn btn-default">Refresh</button>
								</div>
								<div className="clearfix"/>
							</div>
						}

						{
							error === null && !loading && authorities.length === 0 &&
							<div className="card">
								<div className="card-body">
									<em>
										There are no authorities, why don't you create one?
									</em>
								</div>
							</div>
						}

						{
							error === null && !loading && authorities.length > 0 &&
							authorities.map((a) => {
								return (
									<div className="card card-hover col-md-3" onClick={this.caSelected.bind(this)(a.id)} key={a.id}>
										<div className="card-body">
											<h5 className="card-title">
												{a.subject.commonName}
											</h5>
											<h6 className="guid-text card-subtitle mb-2 text-muted">{a.id}</h6>
											<p className="card-text">
												CA was issued at {a.issued} and expires at {a.expires}
											</p>
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

export default Authorities;