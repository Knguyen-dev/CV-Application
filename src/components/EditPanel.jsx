import "../styles/EditPanel.css";
import AddPersonal from "./PersonalForm";
import AddEducation from "./Education/AddEducation";
import CustomButton from "./CustomButton";
import { EditFont } from "./EditFont";

import saveAsImage from "../utilities/saveAsImage";

import PropTypes from "prop-types";
import { useState } from "react";

/*
- Section for switching tabs, which affects the content of the form-section


*/
function EditSideBar({ tabType, onTabChange }) {
	const btnClassList = ["sidebar-btn", "button-shrink", "active-btn"];
	return (
		<div className="edit-sidebar edit-section">
			<CustomButton
				btnText="Content"
				onClick={() => onTabChange("content")}
				classList={
					tabType === "content"
						? btnClassList
						: btnClassList.slice(0, 2)
				}
				iconKeyword="toc"
			/>
			<CustomButton
				btnText="Customize"
				onClick={() => onTabChange("customize")}
				classList={
					tabType === "customize"
						? btnClassList
						: btnClassList.slice(0, 2)
				}
				iconKeyword="edit"
			/>
		</div>
	);
}
EditSideBar.propTypes = {
	tabType: PropTypes.string,
	onTabChange: PropTypes.func,
};

// For critical resume interactions that involve the entire resume
function ResumeActions({ loadExampleResume, downloadResume, clearResume }) {
	return (
		<div className="resume-actions edit-section">
			<header className="edit-section-header">
				<h2>Resume Actions</h2>
			</header>
			<section className="edit-section-body">
				<div className="action-btns-container">
					<CustomButton
						btnText="Load Example Resume"
						classList={["load-example-btn", "button-shrink"]}
						onClick={loadExampleResume}
					/>

					<CustomButton
						btnText="Download"
						classList={["download-resume-btn", "button-shrink"]}
						iconKeyword="download"
						onClick={downloadResume}
					/>

					<CustomButton
						btnText="Clear Resume"
						classList={["clear-resume-btn", "button-shrink"]}
						onClick={clearResume}
						iconKeyword="delete"
					/>
				</div>
			</section>
		</div>
	);
}
ResumeActions.propTypes = {
	loadExampleResume: PropTypes.func,
	downloadResume: PropTypes.func,
	clearResume: PropTypes.func,
};

/*
- Component responsible for creating and handling the forms and 
	all of their functionalities.
*/
function EditPanel({
	loadExampleResume,
	clearResumeData,
	clearFormData,
	formSetters,
	onInputChange,
	personalData,
	submitForm,
	setEditIndex,
	isEdit,
	setIsEdit,
	deleteResumeItem,
	activeForm,
	setActiveForm,
}) {
	/*
	1. tabType: State that tracks which tab the user is on, either 'content' or 'customize'
	2. activeSectionIndex: State that tracks the collapsible section that the user has open
	3. fontClass: State that tracks the css class that should be added onto the resume div, which in turn will change the font of the resume
	*/
	const [tabType, setTabType] = useState("content");
	const [activeSection, setActiveSection] = useState("");
	const [fontClass, setFontClass] = useState("arial-font");

	/*
	- Getting our item lists
	- Going to define our item lists here, these don't need to be copies since 
	 we aren't going to mutate or change these lists. These should only be used for creating the sidebars
	 for displaying the items.
	*/
	const schoolList = formSetters["schoolForm"].itemList;
	const jobList = formSetters["jobForm"].itemList;

	/*
	- Function for canceling or closing out of a form. This closes 
		the form and eliminates the input that was in the form 
	1. formKey: Key used for identifying a form. Again these 
		are defined in formSetters because each key will make us
		use different functions for different forms.
	*/
	const closeForm = (formKey) => {
		clearFormData(formKey);
		setActiveForm("");
		setIsEdit(false);
	};

	/*
	- Toggles an item's visibility.
	1. itemObj is actually an element in itemList, and 
		javascript handles objects as references. Objects 
		and arrays are non-primitive, meaning when passed to 
		functions they are references, whilst strings and numbers 
		are passed via value. Just a good thing to remember.
	NOTE: For visibility to work properly, you have to remember
		to set the state to a new array.
	*/
	const toggleItemVisibility = (itemObj, itemList, setItemList) => {
		itemObj.isVisible = !itemObj.isVisible;
		setItemList([...itemList]);
	};

	const editItem = (formKey, index, itemList) => {
		setActiveForm(formKey);
		setEditIndex(index);
		formSetters[formKey].setFormData(itemList[index]);
		setIsEdit(true);
	};

	// Based on the state, render components for 'form-section'
	const tabContent = {
		content: (
			<>
				<AddPersonal
					onInputChange={onInputChange}
					personalData={personalData}
				/>
				<AddEducation
					schoolList={schoolList}
					onItemClick={editItem}
					toggleVisibility
					isOpen
					toggleIsOpen
					isActiveForm
					showForm
					onInputChange
					formData
					isEdit
					deleteItem
					closeForm
					saveItem
				/>
			</>
		),
		customize: (
			<>
				<EditFont fontClass={fontClass} setFontClass={setFontClass} />
			</>
		),
	};

	return (
		<div className="edit-panel">
			<EditSideBar tabType={tabType} onTabChange={setTabType} />
			<div className="form-section">
				<ResumeActions
					loadExampleResume={() => {
						loadExampleResume();
						setFontClass("arial-font");
					}}
					downloadResume={saveAsImage}
					clearResume={clearResumeData}
				/>
				{tabContent[tabType]}
			</div>
		</div>
	);
}
EditPanel.propTypes = {
	loadExampleResume: PropTypes.func,
	clearResumeData: PropTypes.func,
	clearFormData: PropTypes.func,
	onInputChange: PropTypes.func,
	formSetters: PropTypes.object,
	personalFields: PropTypes.array,
	schoolFields: PropTypes.array,
	jobFields: PropTypes.array,
	submitForm: PropTypes.func,
	editIndex: PropTypes.number,
	setEditIndex: PropTypes.func,
	isEdit: PropTypes.bool,
	setIsEdit: PropTypes.func,
	deleteResumeItem: PropTypes.func,
	activeForm: PropTypes.string,
	setActiveForm: PropTypes.func,
};

export default EditPanel;
