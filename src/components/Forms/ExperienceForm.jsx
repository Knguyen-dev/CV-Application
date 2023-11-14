import InputGroup from "./InputGroup";
import FormButtons from "./FormButtons";
import PropTypes from "prop-types";

function ExperienceForm({
	onInputChange,
	formData,
	isEdit,
	deleteItem,
	closeForm,
	saveItem,
}) {
	return (
		<form
			id="education-info-form"
			onSubmit={(e) => {
				e.preventDefault();
				saveItem(e);
				closeForm();
			}}
		>
			<InputGroup
				id="input-company-name"
				placeholder="Enter company / organization"
				type="text"
				labelText="Company"
				onChange={onInputChange}
				value={formData["company-name"]}
				required={true}
				name="company-name"
			/>
			<InputGroup
				id="input-position-title"
				placeholder="Enter position title"
				type="text"
				labelText="Position"
				onChange={onInputChange}
				value={formData["position-title"]}
				required={true}
				name="position-title"
			/>
			<InputGroup
				id="input-start-date-experience"
				placeholder="Enter start date in format (mm/yyyy)"
				type="text"
				labelText="Start Date"
				onChange={onInputChange}
				value={formData["start-date"]}
				required={true}
				name="start-date"
			/>
			<InputGroup
				id="input-end-date-experience"
				placeholder="Enter end date in format (mm/yyyy)"
				type="text"
				labelText="End Date"
				onChange={onInputChange}
				value={formData["end-date"]}
				required={true}
				name="end-date"
			/>
			<InputGroup
				id="input-address-experience"
				placeholder="Enter address"
				type="text"
				labelText="Address"
				onChange={onInputChange}
				value={formData["address"]}
				recommended={true}
				name="address"
			/>
			<InputGroup
				id="input-job-description"
				placeholder="Enter job description"
				type="textarea"
				labelText="Description"
				onChange={onInputChange}
				value={formData["job-description"]}
				recommended={true}
				name="job-description"
			/>

			<FormButtons
				isEdit={isEdit}
				deleteItem={deleteItem}
				closeForm={closeForm}
			/>
		</form>
	);
}
ExperienceForm.propTypes = {
	onInputChange: PropTypes.func,
	formData: PropTypes.shape({
		"company-name": PropTypes.string,
		"position-title": PropTypes.string,
		"start-date": PropTypes.string,
		"end-date": PropTypes.string,
		address: PropTypes.string,
		"job-description": PropTypes.string,
	}).isRequired,
	isEdit: PropTypes.bool,
	deleteItem: PropTypes.func,
	closeForm: PropTypes.func,
	saveItem: PropTypes.func,
};

export default ExperienceForm;
