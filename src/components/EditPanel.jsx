import "../styles/EditPanel.css";
import { PersonalInfoForm } from "./Forms";
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

function ResumeActions() {
	return (
		<div className="resume-actions edit-section">
			<h2>Resume Actions</h2>
			<div className="action-btns-container">
				<button className="load-example-btn button-shrink">
					<span>Load Example Resume</span>
				</button>
				<button className="download-resume-btn button-shrink">
					<span className="material-symbols-outlined">download</span>
					<span>Download</span>
				</button>
				<button className="clear-resume-btn button-shrink">
					<span className="material-symbols-outlined">delete</span>
					<span>Clear Resume</span>
				</button>
			</div>
		</div>
	);
}

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

function EditPanel() {
	const [tabType, setTabType] = useState("content");

	const [isOpen, setIsOpen] = useState({
		personalInfoForm: true,
	});

	// Based on the state, render components for 'form-section'
	const tabContent = {
		content: (
			<>
				<PersonalInfoForm isOpen={isOpen} handleIsOpen={setIsOpen} />
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
				<ResumeActions />

				{tabContent[tabType]}
			</div>
		</div>
	);
}

export default EditPanel;
