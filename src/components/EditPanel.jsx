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
}) {
	const [tabType, setTabType] = useState("content");
	const [isOpen, setIsOpen] = useState({
		personalInfoForm: true,
		schoolForm: true,
	});

	/*
	- Html markup for all schools, each element should be a school-list-item
		and we plan to render it in school-list ul element also

		<ul className="school-list">
			<div className="school-list-item">
				<span className="school-name">
					School 1
				</span>
				<button>Hide</button>
			</div>
		</ul>
	
	
	*/
	const schoolList = [];

	// Based on the state, render components for 'form-section'
	const tabContent = {
		content: (
			<>
				<div className="edit-section">
					<header>
						<h2>Personal Details</h2>
						<button
							className="drop-down-btn button-shrink"
							onClick={() => {
								setIsOpen({
									...isOpen,
									personalInfoForm: !isOpen.personalInfoForm,
								});
							}}
						>
							{isOpen.personalInfoForm ? "Less" : "More"}
						</button>
					</header>

					{isOpen.personalInfoForm ? (
						<PersonalInfoForm
							handleForm={handlePersonalForm}
							formFields={personalFields}
						/>
					) : null}
				</div>

				<div className="edit-section">
					<header>
						<h2>Education</h2>
						<button
							className="drop-down-btn button-shrink"
							onClick={() => {
								setIsOpen({
									...isOpen,
									schoolForm: !isOpen.schoolForm,
								});
							}}
						>
							{isOpen.schoolForm ? "Less" : "More"}
						</button>
					</header>

					{isOpen.schoolForm ? (
						<>
							<SchoolForm
								handleForm={handleSchoolForm}
								formFields={schoolFields}
							/>
						</>
					) : null}
				</div>
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
};

export default EditPanel;
