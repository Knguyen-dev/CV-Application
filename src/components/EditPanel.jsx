import "../styles/EditPanel.css";
import ItemFormSection from "./ItemFormSection";
import { PersonalInfoForm, ItemForm } from "./Forms";
import CustomButton from "./CustomButton";
import { SidebarItem } from "./Sidebar";

import PropTypes from "prop-types";

import { useState } from "react";

// Section for switching tabs, which affects the content of the form-section
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
function ResumeActions({ loadExampleResume, clearResume }) {
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
	clearResume: PropTypes.func,
};

/*
+ tabType: "content" or "customize"
- If we're on the content tab, we show forms for personal info, education, and profession.
- Else if we're on the customize tab, we show the diferent sections 
	for customizing such as layout, color, and fonts, or whatever 
	sections we want to have for customization

+ isOpen: Our state, which'll be a map that keeps track whether 
	our forms are open or not. This helps persist the states of the forms
	even when the user switches tabs in the application.

*/

function EditPanel({
	loadExampleResume,
	clearResumeData,
	clearFormData,
	formSetters,
	onInputChange,
	personalFields,
	schoolFields,
	submitForm,
	setEditIndex,
	isEdit,
	setIsEdit,
	deleteResumeItem,
}) {
	const [tabType, setTabType] = useState("content");

	const [activeSectionIndex, setActiveSectionIndex] = useState(0);

	const [isActiveForm, setIsActiveForm] = useState({
		schoolForm: false,
	});

	// Going to define our item lists here
	const schoolList = formSetters["schoolForm"].itemList;

	const toggleActiveSection = (index) => {
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
		if (activeSectionIndex === index) {
			setActiveSectionIndex(-1);
		} else {
			setActiveSectionIndex(index);
		}
	};

	const closeForm = (formKey) => {
		/*
		- Function for canceling or closing out of a form. This closes 
			the form and eliminates the input that was in the form 
		
		1. clearFormKey: Key used for clearing the target form's data
		2. closeFormKey: Key used for deactivating the target form
		3. isEdit: Boolean indicating whether the user is editing an existing item on the form, rather
			than entering in new information for adding an item. Set isEdit to false
			because if they were editing, closing the form gets them out of editing.
			This allows us to correctly track when the user is editing.
		
		NOTE: Properly closing a form means using the correct
			keys for clearing its data and deactivating it. Keep in 
			mind the keys for 'isActiveForm' and the keys
			for the objects in clearFormData. While it's important to 
			stay consistent with the keys, having two parameters makes it 
			so if keys do change, the change doesn't have to happen on both sides.
		*/
		clearFormData(formKey);
		setIsActiveForm({
			...isActiveForm,
			[formKey]: false,
		});
		setIsEdit(false);
	};

	// Toggles an item's visibility
	const toggleItemVisibility = (
		itemObj,
		itemIndex,
		itemList,
		setItemList
	) => {
		itemObj.isVisible = !itemList[itemIndex].isVisible;
		let newItemList = [...itemList];
		newItemList[itemIndex] = itemObj;
		setItemList(newItemList);
	};

	// Mark up for each item form section
	const sectionArr = [
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
									setIsActiveForm({
										...isActiveForm,
										schoolForm: true,
									});
									setEditIndex(index);
									formSetters["schoolForm"].setFormData(
										schoolList[index]
									);
									setIsEdit(true);
								}}
								toggleVisibility={() => {
									toggleItemVisibility(
										schoolObj,
										index,
										schoolList,
										formSetters["schoolForm"].setItemList
									);
								}}
							/>
						);
					})}
				</ul>
			),
			itemForm: (
				<ItemForm
					formID="education-form"
					onInputChange={(e) => onInputChange(e, "schoolForm")}
					deleteItem={() => deleteResumeItem("schoolForm")}
					closeForm={() => closeForm("schoolForm")}
					formFields={schoolFields}
					submitForm={(e) => submitForm(e, "schoolForm")}
					isEdit={isEdit}
				/>
			),
			isActiveForm: isActiveForm.schoolForm,
			showFormBtnText: "Add School",
			showForm: () =>
				setIsActiveForm({ ...isActiveForm, schoolForm: true }),
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
				<p>Sample customization content</p>
			</>
		),
	};

	return (
		<div className="edit-panel">
			<EditSideBar tabType={tabType} onTabChange={setTabType} />
			<div className="form-section">
				<ResumeActions
					loadExampleResume={loadExampleResume}
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
	submitForm: PropTypes.func,
	editIndex: PropTypes.number,
	setEditIndex: PropTypes.func,
	isEdit: PropTypes.bool,
	setIsEdit: PropTypes.func,
	deleteResumeItem: PropTypes.func,
};

export default EditPanel;
