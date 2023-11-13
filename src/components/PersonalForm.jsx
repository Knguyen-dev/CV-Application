import InputGroup from "./InputGroup";
import PropTypes from "prop-types";
function PersonalForm({ onInputChange, formData }) {
	const fullName = formData["full-name"];
	const email = formData["email"];
	const phoneNumber = formData["phone-number"];
	const address = formData["address"];
	return (
		<form id="personal-info-form">
			<InputGroup
				id="input-full-name"
				placeholder="Enter full name"
				type="text"
				labelText="Full name"
				onChange={onInputChange}
				value={fullName}
				name="full-name"
			/>
			<InputGroup
				id="input-email"
				placeholder="Enter email"
				type="email"
				labelText="Email"
				onChange={onInputChange}
				value={email}
				recommended={true}
				name="email"
			/>
			<InputGroup
				id="input-phone-number"
				placeholder="Enter phone number"
				type="text"
				labelText="Phone Number"
				onChange={onInputChange}
				value={phoneNumber}
				optional={true}
				// recommended={true}
				name="phone-number"
			/>
			<InputGroup
				id="input-address"
				placeholder="Enter address"
				type="text"
				labelText="Address"
				onChange={onInputChange}
				value={address}
				recommended={true}
				name="address"
			/>
		</form>
	);
}
PersonalForm.propTypes = {
	onInputChange: PropTypes.func,
	formData: PropTypes.shape({
		"full-name": PropTypes.string,
		email: PropTypes.string,
		"phone-number": PropTypes.string,
		address: PropTypes.string,
	}).isRequired,
};

function AddPersonal({ onInputChange, personalData }) {
	return (
		<div className="edit-section">
			<header className="edit-section-header">
				<h2>Personal Details</h2>
			</header>
			<section className="edit-section-body">
				<PersonalForm
					onInputChange={(e) => onInputChange(e, "personalForm")}
					formData={personalData}
				/>
			</section>
		</div>
	);
}
AddPersonal.propTypes = {
	onInputChange: PropTypes.func,
	personalData: PropTypes.shape({
		"full-name": PropTypes.string,
		email: PropTypes.string,
		"phone-number": PropTypes.string,
		address: PropTypes.string,
	}).isRequired,
};
export default AddPersonal;
