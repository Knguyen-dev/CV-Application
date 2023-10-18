import "../styles/Forms.css";
import PropTypes from "prop-types";
/*
+ FormFields: Reusable component that creates form fields.

1. formFields: Array of objects that's going to create the form fields
2. fieldValues: Object that has keys, which are the values of 
	inputID from formFields.
*/
function FormFields({ onChange, formFields }) {
	return (
		<div className="form-fields">
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
							value={field.value}
							onChange={onChange}
						/>
					</div>
				);
			})}
		</div>
	);
}
FormFields.propTypes = {
	onChange: PropTypes.func,
	formFields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			type: PropTypes.string,
			label: PropTypes.string,
			inputID: PropTypes.string,
			placeholder: PropTypes.string,
			value: PropTypes.string,
		})
	),
};

function PersonalInfoForm({ handleForm, formFields }) {
	return (
		<form id="personal-info-form">
			<FormFields onChange={handleForm} formFields={formFields} />
		</form>
	);
}
PersonalInfoForm.propTypes = {
	handleForm: PropTypes.func,
	formFields: PropTypes.array,
	isOpen: PropTypes.bool,
	toggleIsOpen: PropTypes.func,
};

function SchoolForm({ handleForm, formFields }) {
	return (
		<form id="education-form">
			<FormFields onChange={handleForm} formFields={formFields} />
			<div className="form-btn-container">
				<button className="delete-btn">Delete</button>
				<button className="cancel-btn">Cancel</button>
				<button className="save-btn">Save</button>
			</div>
		</form>
	);
}
SchoolForm.propTypes = {
	handleForm: PropTypes.func,
	formFields: PropTypes.array,
	isOpen: PropTypes.bool,
	toggleIsOpen: PropTypes.func,
};
export { PersonalInfoForm, SchoolForm };
