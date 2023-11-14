import PropTypes from "prop-types";
import Sidebar from "../Sidebar";

import CustomButton from "../CustomButton";

import "../../styles/AddItem.css";

function AddItem({
	sectionTitle,
	itemList,
	isOpen,
	toggleIsOpen,
	isActiveForm,
	showForm,
	itemForm,
	addItemBtnText,
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
			<section
				className={`edit-section-body item-section-body ${
					isOpen && "open"
				}`}
			>
				<div className="flow-div">
					{isActiveForm ? (
						itemForm
					) : (
						<>
							<Sidebar itemList={itemList} />
							<div className="open-form-btn-container">
								<CustomButton
									btnText={addItemBtnText}
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
				</div>
			</section>
		</div>
	);
}

AddItem.propTypes = {
	sectionTitle: PropTypes.string,
	itemList: PropTypes.array,
	editItem: PropTypes.func,
	toggleVisibility: PropTypes.func,
	isOpen: PropTypes.bool,
	toggleIsOpen: PropTypes.func,
	isActiveForm: PropTypes.bool,
	showForm: PropTypes.func,
	itemForm: PropTypes.element,
	addItemBtnText: PropTypes.string,
};

export default AddItem;
