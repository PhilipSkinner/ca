import React, {Component} from 'react';

import Error from './error';

class Authorities extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      authorities 	: [],
	      error 		: null
	    };
	}

	componentDidMount() {
        fetch(localStorage.getItem('apiroot') + '/ca', {
        	method : 'GET'
        })
        .then(res => res.json())
        .then((data) => {
			this.setState({ 
				authorities : data 
			});
        })
        .catch((err) => {
        	this.setState({
        		error : err
        	});
        });
	}

	caSelected(event) {
		console.log(event.target);
	}

	render() {
		const {
			error,
			authorities
		} = this.state;

		return (
			<div className="container pt-4">
				<div className="row">
					<div className="authorities col-md-12">
						{ 
							error !== null && 
							<Error error={error} />
						}

						{
							error === null &&
							<div className="col-md-12 pb-4">
								<div className="float-left">
									<h1 className="h3">Authorities</h1>
								</div>
								<div className="float-right">
									<button className="btn btn-primary mr-4">Add Authority</button>
									<button className="btn btn-default">Refresh</button>
								</div>
								<div className="clearfix"/>
							</div>
						}

						{
							error === null && authorities.length === 0 &&
							<div className="card">
								<div className="card-body">
									<em>
										There are no authorities, why don't you create one?
									</em>
								</div>
							</div>
						}

						{
							error === null && authorities.length > 0 &&
							authorities.map((a) => {
								return (
									<div className="card card-hover col-md-3" onClick={this.caSelected.bind(this)} key={a.id}>
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