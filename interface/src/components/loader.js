import React, {Component} from 'react';

class Loader extends Component {
	render() {
		const {
			message
		} = this.props;

		return (
			<div className="loader">
				<div className="loader-inner">
					<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-wedges"><g transform="translate(50,50)"><g ng-attr-transform="scale({{config.scale}})" transform="scale(0.7)"><g transform="translate(-50,-50)"><g transform="rotate(23.3078 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="0.75s" begin="0s" repeatCount="indefinite"></animateTransform><path ng-attr-fill-opacity="{{config.opacity}}" ng-attr-fill="{{config.c1}}" d="M50 50L50 0A50 50 0 0 1 100 50Z" fill-opacity="0.8" fill="#1d3f72"></path></g><g transform="rotate(17.4809 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform><path ng-attr-fill-opacity="{{config.opacity}}" ng-attr-fill="{{config.c2}}" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(90 50 50)" fill-opacity="0.8" fill="#5699d2"></path></g><g transform="rotate(11.6539 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.5s" begin="0s" repeatCount="indefinite"></animateTransform><path ng-attr-fill-opacity="{{config.opacity}}" ng-attr-fill="{{config.c3}}" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(180 50 50)" fill-opacity="0.8" fill="#d8ebf9"></path></g><g transform="rotate(5.82696 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="3s" begin="0s" repeatCount="indefinite"></animateTransform><path ng-attr-fill-opacity="{{config.opacity}}" ng-attr-fill="{{config.c4}}" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(270 50 50)" fill-opacity="0.8" fill="#71c2cc"></path></g></g></g></g></svg>
		  			<p>
		  				{message}
		  			</p>
	  			</div>
	  		</div>
	  	);
	}
}

export default Loader;