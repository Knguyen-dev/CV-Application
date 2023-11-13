import PropTypes from "prop-types";
import CustomButton from "../CustomButton";
import Sidebar from "../Sidebar";
import EducationForm from "./EducationForm";

function AddEducation({
	schoolList,
	onItemClick,
	toggleVisibility,
	isOpen,
	toggleIsOpen,
	isActiveForm,
	showForm,
	onInputChange,
	formData,
	isEdit,
	deleteItem,
	closeForm,
	saveItem,
}) {
	const itemsArr = schoolList.map((schoolObj, index) => {
		return {
			id: schoolObj.id,
			itemName: schoolObj["school-name"],
			isVisible: schoolObj.isVisible,
			onItemClick: () => onItemClick(index),
			toggleVisibility: () => toggleVisibility(schoolObj, schoolList),
		};
	});
	return (
		<div className="edit-section item-form-section">
			<header>
				<h2>Education</h2>
				<button
					className="drop-down-btn button-shrink"
					onClick={toggleIsOpen}
				>
					{isOpen ? "Less" : "More"}
				</button>
			</header>
			{isOpen ? (
				<section className="edit-section-body">
					{isActiveForm ? (
						<EducationForm
							onInputChange={onInputChange}
							formData={formData}
							isEdit={isEdit}
							deleteItem={deleteItem}
							closeForm={closeForm}
							saveItem={saveItem}
						/>
					) : (
						<>
							{/* Sidebar here */}
							<div className="open-form-btn-container">
								<CustomButton
									btnText="Add School"
									classList={[
										"open-form-btn",
										"button-shrink",
									]}
									onClick={showForm}
									iconKeyword="add"
								/>
							</div>
						</>
					)}
				</section>
			) : null}
		</div>
	);
}

AddEducation.propTypes = {
	schoolList: PropTypes.array,
	onItemClick: PropTypes.array,
	toggleVisibility: PropTypes.array,
	isOpen: PropTypes.bool,
	toggleIsOpen: PropTypes.func,
	isActiveForm: PropTypes.bool,
	showForm: PropTypes.func,
	onInputChange: PropTypes.func,
	formData: PropTypes.object,
	isEdit: PropTypes.bool,
	deleteItem: PropTypes.func,
	closeForm: PropTypes.func,
	saveItem: PropTypes.func,
};

export default AddEducation;
