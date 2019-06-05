import React, {Component} from 'react';

class Settings extends Component {
	constructor(props) {
	    super(props);

	    if (localStorage.getItem('apiroot') === null) {
	    	localStorage.setItem('apiroot', 'http://localhost:3000');
	    }

	    this.state = {
	      settings : {
	      	passkey : localStorage.getItem('passkey'),
	      	apiroot : localStorage.getItem('apiroot')
	      }
	    };
	}

	changePasskey(event) {
    	localStorage.setItem('passkey', event.target.value);
	}

	changeAPIRoot(event) {
		localStorage.setItem('apiroot', event.target.value);
	}

	render() {
		const {
			settings
		} = this.state;

		return (
			<div className="container pt-4">
				<div className="row">
					<div className="settingsForm col-md-12">
						<div className="card">
  							<div className="card-body">
  								<h1 className="h3">Settings</h1>

  								<p>
  									These settings are stored in your browsers local storage state and are used for communicating with the CA API.
  								</p>

  								<div className="border-top mt-4 pb-4" />

								<form>
									<div className="form-group">
										<label for="apiroot">API Root</label>
										<input
											value={settings.apiroot}
											onChange={this.changeAPIRoot.bind(this)}
											id="apiroot"
											type="text"
											className="form-control"
											aria-describedby="apirootHelp"
											placeholder="http://localhost:3000"
										/>
										<small id="apirootHelp" className="form-text text-muted">Enter the root for your API - for example https://myserver.com/ca/ or http://localhost:3000.</small>
									</div>
				  					<div className="form-group">
										<label for="passkeyField">Pass Key</label>
				    					<input 
				    						value={settings.passkey} 
				    						onChange={this.changePasskey.bind(this)}
				    						id="passkeyField"
				    						type="text" 
				    						className="form-control" 
				    						aria-describedby="passkeyHelp" 
				    						placeholder="Enter passkey" 
			    						/>
				    					<small id="passkeyHelp" className="form-text text-muted">Enter your passkey for unlocking your private keys.</small>
				  					</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
	  	);
	}
}

export default Settings;