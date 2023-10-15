import "../styles/Forms.css";
import PropTypes from "prop-types";

/*
+ FormFields: Reusable component that creates form fields.

1. formFields: Array of objects that's going to create the form fields
2. onChange: Function to be called when input fields are changed. We're 
	planning it so that this function will change some state representing 
	form data in an upper component. 
*/
function FormFields({ formFields, onChange }) {
	return (
		<>
			{formFields.map((field) => {
				return (
					<div key={field.inputID} className="input-group">
						<label htmlFor={field.inputID}>
							<span className="label-text">{field.label}</span>
						</label>
						<input
							type={field.type}
							name={field.name}
							id={field.inputID}
							placeholder={field.placeholder}
							onChange={onChange}
						/>
					</div>
				);
			})}
		</>
	);
}

FormFields.propTypes = {
	formFields: PropTypes.arrayOf(
		PropTypes.exact({
			name: PropTypes.string,
			type: PropTypes.string,
			label: PropTypes.string,
			inputID: PropTypes.string,
			placeholder: PropTypes.string,
		})
	),
	onChange: PropTypes.func,
};

function PersonalInfoForm({ isOpen, handleIsOpen }) {
	const formFields = [
		{
			name: "full-name",
			type: "text",
			label: "Full name",
			inputID: "input-full-name",
			placeholder: "Enter full name",
		},
		{
			name: "email",
			type: "email",
			label: "Email",
			inputID: "input-email",
			placeholder: "Enter email address",
		},
		{
			name: "phone-number",
			type: "text",
			label: "Phone number",
			inputID: "input-phone-number",
			placeholder: "Enter phone number",
		},
		{
			name: "address",
			type: "text",
			label: "Address",
			inputID: "input-address",
			placeholder: "Enter address",
		},
	];

	return (
		<div className="edit-section">
			<header>
				<h2>Personal Details</h2>
				<button
					className="drop-down-btn button-shrink"
					onClick={() => handleIsOpen(!isOpen)}
				>
					{isOpen ? "Less" : "More"}
				</button>
			</header>

			{isOpen ? (
				<form id="personal-info-form">
					<FormFields formFields={formFields} />
				</form>
			) : null}
		</div>
	);
}

PersonalInfoForm.propTypes = {
	isOpen: PropTypes.bool,
	handleIsOpen: PropTypes.func,
};

export { PersonalInfoForm };
