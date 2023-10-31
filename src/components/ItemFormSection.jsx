/*
+ ItemFormSection: A collapsible component with a form and 
    sidebar. The form is used when the user wants to add an item 
    to their cv while the sidebar is there to display the
    amount of those items that are on the user's CV. So you
    should be able to use this when the user is adding 
    schools/educations, job experiences, contacts-references, accolades.

- sectionTitle: Title of section
- isOpen: Whether this section is active or not basically, so whether the user 
	has this section 'open'
- toggleIsOpen: A function to toggle whether that section is open or not
- itemForm: item form associated with the section
- itemSidebar: sidebar that displays items 
- showFormBtnText: Text for the show form btn
- showForm: Function for showing a form, which sets the form as active
*/
import CustomButton from "./CustomButton";
import PropTypes from "prop-types";
function ItemFormSection({
	sectionTitle,
	isOpen,
	toggleIsOpen,
	isActiveForm,
	itemForm,
	itemSidebar,
	showFormBtnText,
	showForm,
}) {
	return (
		<div className="edit-section item-form-section">
			<header>
				<h2>{sectionTitle}</h2>
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
						itemForm
					) : (
						<>
							{itemSidebar}
							<div className="open-form-btn-container">
								<CustomButton
									btnText={showFormBtnText}
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

ItemFormSection.propTypes = {
	sectionTitle: PropTypes.string,
	isOpen: PropTypes.bool,
	toggleIsOpen: PropTypes.func,
	isActiveForm: PropTypes.bool,
	itemForm: PropTypes.element,
	itemSidebar: PropTypes.element,
	showFormBtnText: PropTypes.string,
	showForm: PropTypes.func,
};

export default ItemFormSection;
