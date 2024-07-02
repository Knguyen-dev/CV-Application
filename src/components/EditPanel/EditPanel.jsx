import "../../styles/EditPanel.css";
import AddItem from "../Forms/AddItem";
import AddPersonal from "../Forms/PersonalForm";
import EducationForm from "../Forms/EducationForm";
import ExperienceForm from "../Forms/ExperienceForm";
import EditFont from "./EditFont";
import ResumeActions from "./ResumeActions";
import EditSideBar from "./EditSidebar";
import { generatePdf } from "../../utilities/generatePdf";

import PropTypes from "prop-types";
import { useState } from "react";

/*
- Component responsible for showing and controlling the features 
	that allow the user to interact with the resume. Mainly things 
	such as rendering forms correctly, and correctly showing resume 
	items that the user has created on a sidebar.
*/
function EditPanel({
	loadExampleResume,
	clearResumeData,
	closeForm,
	toggleItemVisibility,
	editItem,
	formSetters,
	onInputChange,
	personalData,
	schoolData,
	jobData,
	saveItem,
	isEdit,
	deleteResumeItem,
	activeForm,
	setActiveForm,
	setFontClass,
	fontClass,
}) {
	/*
	1. tabType: State that tracks which tab the user is on, either 'content' or 'customize'
	2. activeSectionIndex: State that tracks the collapsible section that the user has open
	3. fontClass: State that tracks the css class that should be added onto the resume div, which in turn will change the font of the resume
	*/
	const [tabType, setTabType] = useState("content");
	const [activeSection, setActiveSection] = useState("");

	/*
	- Getting our item lists
	- Going to define our item lists here, these don't need to be copies since 
	 we aren't going to mutate or change these lists. These should only be used for creating the sidebars
	 for displaying the items.
	*/
	const toggleActiveSection = (section) => {
		if (section === activeSection) {
			setActiveSection("");
		} else {
			setActiveSection(section);
		}
	};

	// Define our lists that we want to use to render stuff in the interactive sidebar
	const schoolList = formSetters["schoolForm"].itemList.map(
		(schoolObj, index) => {
			return {
				id: schoolObj.id,
				itemName: schoolObj["school-name"],
				isVisible: schoolObj.isVisible,
				editItem: () =>
					editItem(
						"schoolForm",
						index,
						formSetters["schoolForm"].itemList
					),
				toggleVisibility: () =>
					toggleItemVisibility(
						"schoolForm",
						schoolObj,
						formSetters["schoolForm"].itemList
					),
			};
		}
	);

	const jobList = formSetters["jobForm"].itemList.map((jobObj, index) => {
		return {
			id: jobObj.id,
			itemName: jobObj["company-name"],
			isVisible: jobObj.isVisible,
			editItem: () =>
				editItem("jobForm", index, formSetters["jobForm"].itemList),
			toggleVisibility: () =>
				toggleItemVisibility(
					"jobForm",
					jobObj,
					formSetters["jobForm"].itemList
				),
		};
	});

	const EducationFormComp = (
		<EducationForm
			onInputChange={(e) => onInputChange(e, "schoolForm")}
			formData={schoolData}
			isEdit={isEdit}
			deleteItem={() => deleteResumeItem("schoolForm")}
			closeForm={() => closeForm("schoolForm")}
			saveItem={(e) => saveItem(e, "schoolForm")}
		/>
	);

	const ExperienceFormComp = (
		<ExperienceForm
			onInputChange={(e) => onInputChange(e, "jobForm")}
			formData={jobData}
			isEdit={isEdit}
			deleteItem={() => deleteResumeItem("jobForm")}
			closeForm={() => closeForm("jobForm")}
			saveItem={(e) => saveItem(e, "jobForm")}
		/>
	);

	// Based on the state, render components for 'form-section'
	const tabContent = {
		content: (
			<>
				<AddPersonal
					onInputChange={(e) => onInputChange(e, "personalForm")}
					personalData={personalData}
				/>
				<AddItem
					sectionTitle="Education"
					itemList={schoolList}
					isOpen={activeSection === "schoolTab"}
					toggleIsOpen={() => toggleActiveSection("schoolTab")}
					isActiveForm={activeForm === "schoolForm"}
					showForm={() => setActiveForm("schoolForm")}
					itemForm={EducationFormComp}
					addItemBtnText="Add School"
				/>
				<AddItem
					sectionTitle="Experience"
					itemList={jobList}
					isOpen={activeSection === "jobTab"}
					toggleIsOpen={() => toggleActiveSection("jobTab")}
					isActiveForm={activeForm === "jobForm"}
					showForm={() => setActiveForm("jobForm")}
					itemForm={ExperienceFormComp}
					addItemBtnText="Add Experience"
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
					downloadResume={generatePdf}
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
	closeForm: PropTypes.func,
	toggleItemVisibility: PropTypes.func,
	editItem: PropTypes.func,
	clearFormData: PropTypes.func,
	onInputChange: PropTypes.func,
	formSetters: PropTypes.object,
	personalData: PropTypes.object,
	schoolData: PropTypes.object,
	jobData: PropTypes.object,
	saveItem: PropTypes.func,
	editIndex: PropTypes.number,
	setEditIndex: PropTypes.func,
	isEdit: PropTypes.bool,
	setIsEdit: PropTypes.func,
	deleteResumeItem: PropTypes.func,
	activeForm: PropTypes.string,
	setActiveForm: PropTypes.func,
	setFontClass: PropTypes.func,
	fontClass: PropTypes.string,
};

export default EditPanel;
