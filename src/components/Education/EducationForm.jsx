import InputGroup from "../InputGroup";
import FormButtons from "../FormButtons";
import PropTypes from "prop-types";

function EducationForm({
	onInputChange,
	formData,
	isEdit,
	deleteItem,
	closeForm,
	saveItem,
}) {
	const schoolName = formData["school-name"];
	const degreeType = formData["degree-type"];
	const startDate = formData["start-date"];
	const endDate = formData["end-date"];
	const address = formData["address"];

	return (
		<form
			id="personal-info-form"
			onSubmit={(e) => {
				e.preventDefault();
				saveItem(e);
				closeForm();
			}}
		>
			<InputGroup
				id="input-school-name"
				placeholder="Enter school / university"
				type="text"
				labelText="School"
				onChange={onInputChange}
				value={schoolName}
				required={true}
				name="school-name"
			/>
			<InputGroup
				id="input-degree-type"
				placeholder="Enter Degree /Field Of Study"
				type="text"
				labelText="Degree"
				onChange={onInputChange}
				value={degreeType}
				required={true}
				name="degree-type"
			/>
			<InputGroup
				id="input-start-date-education"
				placeholder="Enter start date in format (mm/yyyy)"
				type="text"
				labelText="Start Date"
				onChange={onInputChange}
				value={startDate}
				required={true}
				name="start-date"
			/>
			<InputGroup
				id="input-end-date-education"
				placeholder="Enter end date in format (mm/yyyy)"
				type="text"
				labelText="End Date"
				onChange={onInputChange}
				value={endDate}
				required={true}
				name="end-date"
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
			<FormButtons
				isEdit={isEdit}
				deleteItem={deleteItem}
				closeForm={closeForm}
			/>
		</form>
	);
}

EducationForm.propTypes = {
	onInputChange: PropTypes.func,
	formData: PropTypes.shape({
		"school-name": PropTypes.string,
		"degree-type": PropTypes.string,
		"start-date": PropTypes.string,
		"end-date": PropTypes.string,
		address: PropTypes.string,
	}).isRequired,
	isEdit: PropTypes.bool,
	deleteItem: PropTypes.func,
	closeForm: PropTypes.func,
	saveItem: PropTypes.func,
};

export default EducationForm;
