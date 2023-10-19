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
							required={field.isRequired ? true : false}
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

function SchoolForm({ handleForm, closeForm, submitForm, formFields }) {
	return (
		<form id="education-form" onSubmit={submitForm}>
			<FormFields onChange={handleForm} formFields={formFields} />
			<div className="form-btn-container">
				<button className="button-shrink delete-btn">Delete</button>
				<div>
					<button
						className="button-shrink cancel-btn"
						onClick={closeForm}
					>
						Cancel
					</button>
					<button className="button-shrink save-btn" type="submit">
						Save
					</button>
				</div>
			</div>
		</form>
	);
}
SchoolForm.propTypes = {
	handleForm: PropTypes.func,
	formFields: PropTypes.array,
	handleDelete: PropTypes.func,
	closeForm: PropTypes.func,
	submitForm: PropTypes.func,
};
export { PersonalInfoForm, SchoolForm };
