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

function PersonalInfoForm({ onInputChange, formFields }) {
	return (
		<form id="personal-info-form">
			<FormFields onChange={onInputChange} formFields={formFields} />
		</form>
	);
}
PersonalInfoForm.propTypes = {
	onInputChange: PropTypes.func,
	formFields: PropTypes.array,
	isOpen: PropTypes.bool,
	toggleIsOpen: PropTypes.func,
};

/*
+ ItemForm: Form that's used when we want to make a form where the user can
	add items to the CV, and where those items are shown on a sidebar for the user

- Parameters:
1. formID: Id of the form element
2. onInputChange: On input change function used on each input element on the form fields
3. closeForm: Function that closes the form,
4. submitForm: Function that runs logic for submitting the form and adding the item to the CV
5. formFields: Array of objects that's used for making the form fields
6. isEdit: Boolean indicating whether the user is editing an existing item related
	to this form.
*/
function ItemForm({
	formID,
	onInputChange,
	deleteItem,
	closeForm,
	submitForm,
	formFields,
	isEdit,
}) {
	return (
		<form
			id={formID}
			onSubmit={(e) => {
				e.preventDefault();
				submitForm(e);
				closeForm();
			}}
		>
			<FormFields onChange={onInputChange} formFields={formFields} />
			<div className="form-btn-container">
				<button
					type="button"
					className={`button-shrink delete-btn ${
						!isEdit ? "btn-hidden" : ""
					}`}
					onClick={() => {
						deleteItem();
						closeForm();
					}}
				>
					Delete
				</button>
				<div>
					<button
						type="button"
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
ItemForm.propTypes = {
	formID: PropTypes.string,
	onInputChange: PropTypes.func,
	formFields: PropTypes.array,
	deleteItem: PropTypes.func,
	closeForm: PropTypes.func,
	submitForm: PropTypes.func,
	isEdit: PropTypes.bool,
};
export { PersonalInfoForm, ItemForm };
