import "../styles/EditPanel.css";
import { PersonalInfoForm, SchoolForm } from "./Forms";
import PropTypes from "prop-types";
import { useState } from "react";

// Section for switching tabs, which affects the content of the form-section
function EditSideBar({ tabType, onTabChange }) {
	return (
		<div className="edit-sidebar edit-section">
			<button
				className={`sidebar-btn button-shrink ${
					tabType === "content" ? "active-btn" : ""
				}`}
				onClick={() => onTabChange("content")}
			>
				<span className="material-symbols-outlined">toc</span>
				<span>Content</span>
			</button>
			<button
				className={`sidebar-btn button-shrink ${
					tabType === "customize" ? "active-btn" : ""
				} `}
				onClick={() => onTabChange("customize")}
			>
				<span className="material-symbols-outlined">edit</span>
				<span>Customize</span>
			</button>
		</div>
	);
}
EditSideBar.propTypes = {
	tabType: PropTypes.string,
	onTabChange: PropTypes.func,
};

function ResumeActions({ loadExampleResume, clearResume }) {
	return (
		<div className="resume-actions edit-section">
			<h2>Resume Actions</h2>
			<div className="action-btns-container">
				<button
					className="load-example-btn button-shrink"
					onClick={loadExampleResume}
				>
					<span>Load Example Resume</span>
				</button>
				<button className="download-resume-btn button-shrink">
					<span className="material-symbols-outlined">download</span>
					<span>Download</span>
				</button>
				<button
					className="clear-resume-btn button-shrink"
					onClick={clearResume}
				>
					<span className="material-symbols-outlined">delete</span>
					<span>Clear Resume</span>
				</button>
			</div>
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
	clearResume,
	handlePersonalForm,
	personalFields,
	handleSchoolForm,
	schoolFields,
	submitSchoolForm,
	schoolList,
}) {
	const [tabType, setTabType] = useState("content");

	/*

	- Keep the personal details form open, treat
	it differently from education, and professional experiences since 
	those can have a list of items, these are special forms.

	isOpen: Object of booleans used to remember if a drop down was open or not. No two collapsible
		sections can be opened at the same time. So if 'schoolSection' is opened,
		all other sections will be closed, etc. 

	isActiveForm: Object of booleans used to remember when the user still had a 
		particular form opened or not. Multiple forms would be able to be 
		'active' at the same time, which is good since if a user goes back to a 
		section where they opened the form but never canceled it, they'll still see
		their form is still opened.
	*/

	const [isOpen, setIsOpen] = useState({
		schoolSection: true,
	});

	const [isActiveForm, setIsActiveForm] = useState({
		schoolForm: false,
	});

	/*
	- Function for opening and closing specific sections 
		of the edit panel. Such as education, professional experiences, etc.

	- If (openValue): Section was already open beforehand so now they're closing it.
		Here, we'll also deactivate the form for them.

	- Else user is trying to open a closed section, so open it the one
	 	the user clicked and close all other sections
	*/
	const toggleIsOpen = (sectionName) => {
		const openValue = isOpen[sectionName];
		if (openValue) {
			setIsOpen({ ...isOpen, [sectionName]: false });
		} else {
			const newIsOpen = {};
			for (const key in isOpen) {
				if (key === sectionName) {
					newIsOpen[key] = true;
				} else {
					newIsOpen[key] = false;
				}
			}
			setIsOpen(newIsOpen);
		}
	};

	// Create Markup for the education or school section
	const educationSection = (
		<div className="edit-section">
			<header>
				<h2>Education</h2>
				<button
					className="drop-down-btn button-shrink"
					onClick={() => toggleIsOpen("schoolSection")}
				>
					{isOpen.schoolSection ? "Less" : "More"}
				</button>
			</header>
			<section className="edit-section-body">
				{isOpen.schoolSection && !isActiveForm.schoolForm ? (
					/*
					- When the school section is open and its form isn't active:
						1. Render the listed schools on the sidebar.
						2. Render button for opening the form and adding more schools.
					*/
					<>
						<div className="open-form-btn-container">
							<button
								className="open-form-btn button-shrink"
								onClick={() =>
									setIsActiveForm({
										...isActiveForm,
										schoolForm: true,
									})
								}
							>
								<span className="material-symbols-outlined">
									add
								</span>
								<span>Add School</span>
							</button>
						</div>
					</>
				) : null}

				{isOpen.schoolSection && isActiveForm.schoolForm ? (
					<SchoolForm
						handleForm={handleSchoolForm}
						closeForm={() =>
							setIsActiveForm({
								...isActiveForm,
								schoolForm: false,
							})
						}
						formFields={schoolFields}
						submitForm={submitSchoolForm}
					/>
				) : null}
			</section>
		</div>
	);

	// Based on the state, render components for 'form-section'
	const tabContent = {
		content: (
			<>
				<div className="edit-section">
					<header>
						<h2>Personal Details</h2>
					</header>
					<PersonalInfoForm
						handleForm={handlePersonalForm}
						formFields={personalFields}
					/>
				</div>
				{educationSection}
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
					clearResume={clearResume}
				/>
				{tabContent[tabType]}
			</div>
		</div>
	);
}
EditPanel.propTypes = {
	loadExampleResume: PropTypes.func,
	clearResume: PropTypes.func,
	handlePersonalForm: PropTypes.func,
	personalFields: PropTypes.array,
	handleSchoolForm: PropTypes.func,
	schoolFields: PropTypes.array,
	submitSchoolForm: PropTypes.func,
	schoolList: PropTypes.array,
};

export default EditPanel;
