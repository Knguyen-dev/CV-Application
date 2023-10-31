import "../styles/EditPanel.css";
import ItemFormSection from "./ItemFormSection";
import { PersonalInfoForm, ItemForm } from "./Forms";
import CustomButton from "./CustomButton";
import { SidebarItem } from "./Sidebar";
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
	personalFields,
	schoolFields,
	jobFields,
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
	const [activeSectionIndex, setActiveSectionIndex] = useState(0);
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
	+ toggleActionSection: Function for choosing which of the 
		collapsible ItemFormSections is active or opened. There
		are two cases that can happen:

	1. activeSectionIndex === index: This means the user is clicking
		the open/close button on a section that's already open. In this
		case we want to close the section, so we set our index to -1, which 
		will mean on next render, no sections will be open

	2. Else, the index of the section we're trying to open is different 
		from the one that's currently opened, so we set the new index. Then
		on next render the new 'activeSectionIndex' will be the only one that's 
		opened while all others are closed.
	*/
	const toggleActiveSection = (index) => {
		if (activeSectionIndex === index) {
			setActiveSectionIndex(-1);
		} else {
			setActiveSectionIndex(index);
		}
	};

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

	// Mark up for each item form section, all belong in "content tab"
	const sectionArr = [
		/*
		- How to create a section for an item form
		1. Create a title for the section
		2. Create itemSidebar, which is the sidebar showing the items created using said form
			Here we'll render the markup for all of the associated SidebarItems.
			- Set their visibility
			- Set the functionality for editing an item on click
			- Set functionality for toggling its visibility
		*/
		{
			sectionTitle: "Education",
			itemSidebar: (
				<ul className="sidebar-list">
					{schoolList.map((schoolObj, index) => {
						return (
							<SidebarItem
								key={index}
								itemName={schoolObj["school-name"]}
								isVisible={schoolObj["isVisible"]}
								onItemClick={() => {
									setActiveForm("schoolForm");
									setEditIndex(index);
									formSetters["schoolForm"].setFormData(
										schoolList[index]
									);
									setIsEdit(true);
								}}
								toggleVisibility={() => {
									toggleItemVisibility(
										schoolObj,
										schoolList,
										formSetters["schoolForm"].setItemList
									);
								}}
							/>
						);
					})}
				</ul>
			),
			/*
			3. Create the form itself. 
				- We give a function for changing the input, which will affect a state in real time
				- Give function for deleting an associated item on the resume.
				- Set functionality for closing and submitting the form
				- Give object for creating the form fields and give a boolean to see
					when a user is editing the form.
				- Finally, add a function for showing the form or setting it as the active form so 
					we know what form the user is adding or deleting from.
			*/
			itemForm: (
				<ItemForm
					formID="school-form"
					onInputChange={(e) => onInputChange(e, "schoolForm")}
					deleteItem={() => deleteResumeItem("schoolForm")}
					closeForm={() => closeForm("schoolForm")}
					formFields={schoolFields}
					submitForm={(e) => submitForm(e, "schoolForm")}
					isEdit={isEdit}
				/>
			),
			isActiveForm: activeForm === "schoolForm",
			showFormBtnText: "Add School",
			showForm: () => setActiveForm("schoolForm"),
		},
		{
			sectionTitle: "Experiences",
			itemSidebar: (
				<ul className="sidebar-list">
					{jobList.map((jobObj, index) => {
						return (
							<SidebarItem
								key={index}
								itemName={jobObj["company-name"]}
								isVisible={jobObj["isVisible"]}
								onItemClick={() => {
									setActiveForm("jobForm");
									setEditIndex(index);
									formSetters["jobForm"].setFormData(
										jobList[index]
									);
									setIsEdit(true);
								}}
								toggleVisibility={() => {
									toggleItemVisibility(
										jobObj,
										jobList,
										formSetters["jobForm"].setItemList
									);
								}}
							/>
						);
					})}
				</ul>
			),
			itemForm: (
				<ItemForm
					formID="job-form"
					onInputChange={(e) => onInputChange(e, "jobForm")}
					deleteItem={() => deleteResumeItem("jobForm")}
					closeForm={() => closeForm("jobForm")}
					formFields={jobFields}
					submitForm={(e) => submitForm(e, "jobForm")}
					isEdit={isEdit}
				/>
			),
			isActiveForm: activeForm === "jobForm",
			showFormBtnText: "Add Job",
			showForm: () => setActiveForm("jobForm"),
		},
	];

	// Based on the state, render components for 'form-section'
	const tabContent = {
		content: (
			<>
				<div className="edit-section">
					<header className="edit-section-header">
						<h2>Personal Details</h2>
					</header>
					<section className="edit-section-body">
						<PersonalInfoForm
							onInputChange={(e) =>
								onInputChange(e, "personalForm")
							}
							formFields={personalFields}
						/>
					</section>
				</div>
				{sectionArr.map((sectionObj, index) => {
					return (
						<ItemFormSection
							key={index}
							sectionTitle={sectionObj.sectionTitle}
							isOpen={activeSectionIndex === index}
							toggleIsOpen={() => toggleActiveSection(index)}
							isActiveForm={sectionObj.isActiveForm}
							itemForm={sectionObj.itemForm}
							itemSidebar={sectionObj.itemSidebar}
							showFormBtnText={sectionObj.showFormBtnText}
							showForm={sectionObj.showForm}
						/>
					);
				})}
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
