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
							value={field.value}
							onChange={onChange}
						/>
					</div>
				);
			})}
		</>
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

function PersonalInfoForm({ handleForm, formFields, isOpen, toggleIsOpen }) {
	return (
		<div className="edit-section">
			<header>
				<h2>Personal Details</h2>
				<button
					className="drop-down-btn button-shrink"
					onClick={toggleIsOpen}
				>
					{isOpen ? "Less" : "More"}
				</button>
			</header>

			{isOpen ? (
				<form id="personal-info-form">
					<FormFields onChange={handleForm} formFields={formFields} />
				</form>
			) : null}
		</div>
	);
}
PersonalInfoForm.propTypes = {
	handleForm: PropTypes.func,
	formFields: PropTypes.array,
	isOpen: PropTypes.bool,
	toggleIsOpen: PropTypes.func,
};

export { PersonalInfoForm };
