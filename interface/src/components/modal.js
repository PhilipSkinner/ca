import React, {Component} from 'react';

class Modal extends Component {
	onConfirm() {
		this && this.props && this.props.onConfirm && this.props.onConfirm();
	}

	onCancel() {
		this && this.props && this.props.onCancel && this.props.onCancel();
	}

	render() {
		const {
			title,
			message,
			saveButtonText,
			closeButtonText
		} = this.props;

		return (
			<div className="modal modal-show" role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{title}</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCancel.bind(this)}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<p>{message}</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary" onClick={this.onConfirm.bind(this)}>{saveButtonText}</button>
							<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.onCancel.bind(this)}>{closeButtonText}</button>
						</div>
					</div>
				</div>
			</div>
	  	);
	}
}

export default Modal;