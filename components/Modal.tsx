import React from "react";

const Modal = () => {
	return (
		<>
			<input type="checkbox" id="my-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Lorem</h3>
					<p className="py-4">Lorem</p>
					<div className="modal-action">
						<label htmlFor="my-modal" className="btn">
							Yay!
						</label>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
