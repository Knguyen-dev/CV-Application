"use strict";
import "../styles/App.css";

import {
	exampleResumeData,
	personalFormFields,
	schoolFormFields,
	jobFormFields,
} from "../utilities/formData";
import deepCopyArray from "../utilities/deepCopy";

import EditPanel from "./EditPanel";
import Resume from "./Resume";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

function App() {
	/*
	- Set up Personal form:
		1. initialPersonFormData: Object, which is a copy of the state
			but the values are empty strings. Good for reseting form fields.
		2. personalFormData: State that tracks input of form
		3. personalFields: Form fields that will be rendered that 
			also reflect the input values of the state
	*/
	let initialPersonalFormData = {};
	personalFormFields.forEach((field) => {
		initialPersonalFormData[field.name] = "";
	});
	const [personalFormData, setPersonalFormData] = useState(
		initialPersonalFormData
	);
	const personalFields = personalFormFields.map((field) => {
		field.value = personalFormData[field.name];
		return field;
	});

	/*
	- Set up school form and array state to store those items:
	1. initialSchoolFormData: Object, which is a copy of the state
		but the values are empty strings. Good for reseting form fields.
	2. schoolFormData: State that tracks input of form
	3. schoolFields: Form fields that will be rendered that 
		also reflect the input values of the state
	4. schoolList: List to store school objects that the user saved into the application
	*/
	let initialSchoolFormData = {};
	schoolFormFields.forEach((field) => {
		initialSchoolFormData[field.name] = "";
	});
	const [schoolFormData, setSchoolFormData] = useState(initialSchoolFormData);
	const schoolFields = schoolFormFields.map((field) => {
		field.value = schoolFormData[field.name];
		return field;
	});
	const [schoolList, setSchoolList] = useState([]);

	/*
	- Set up professional experiences form
	1. initialJobFormData: Object, which is a copy of the jobFormData, 
		but the values are empty strings, so that we can reset the values for the form fields
	2. jobFormData: State that tracks input of job fomr
	3. jobFields: Form fields for the job form 
	4. jobList: List to store job objects that the user saved into the application using 
		the job form.
	*/
	let initialJobFormData = {};
	jobFormFields.forEach((field) => {
		initialJobFormData[field.name] = "";
	});
	const [jobFormData, setJobFormData] = useState(initialJobFormData);
	const jobFields = jobFormFields.map((field) => {
		field.value = jobFormData[field.name];
		return field;
	});
	const [jobList, setJobList] = useState([]);

	/*
	1. editIndex: Boolean to indicate which school object is being edited in schoolList
	2. isEdit: Boolean that indicates whether the user is editing an existing school object or 
		adding a new one.
	3. activeForm: State to track which of the item forms the user currently has open.
		State's values should be one of the form keys belonging to the 
		Item forms. 
		
	- NOTE: The strings or 'formKeys' used to indicate the 
		form being talked about are defined as keys in formSetters.
	*/
	const [editIndex, setEditIndex] = useState(0);
	const [isEdit, setIsEdit] = useState(false);
	const [activeForm, setActiveForm] = useState("");

	const formSetters = {
		/*
		- Set up a map that has all of the setters we want and related info that helps 
			their functionality.
		*/
		personalForm: {
			setFormData: setPersonalFormData,
			initialFormData: initialPersonalFormData,
		},
		schoolForm: {
			setFormData: setSchoolFormData,
			initialFormData: initialSchoolFormData,
			setItemList: setSchoolList,
			itemList: schoolList,
		},
		jobForm: {
			setFormData: setJobFormData,
			initialFormData: initialJobFormData,
			setItemList: setJobList,
			itemList: jobList,
		},
	};

	const loadExampleResume = () => {
		/*
		- Create functions for clearing and loading entire resume with data
		1. First clear resume data, this way we can clear 
			form data and make it so the user isn't in edit mode anymore.
		2. Then load in example data. We load in the arrays as 
			deep copies because we don't want the application 
			messing with the original data we provided from formData.js
		*/
		clearResumeData();
		setPersonalFormData(exampleResumeData.personalInfo);
		setSchoolList(deepCopyArray(exampleResumeData.schoolList));
		setJobList(deepCopyArray(exampleResumeData.jobList));
	};

	const clearResumeData = () => {
		/*
		- Clears all user data related to their resume
		1. Clears all input in their forms.
		2. Then clears all items they created.
		3. Set isEdit to false in case they are editing something, and 
			then they cleared their data. 

		NOTE: Setting isEdit to false prevents a lot of issues with 
			rendering in Resume.jsx, as it prevents the application
			from indexing an element that doesn't exist, among other things.
		*/
		clearFormData("personalForm");
		clearFormData("schoolForm");
		clearFormData("jobForm");
		setSchoolList([]);
		setJobList([]);
		setIsEdit(false);
	};

	const onInputChange = (e, formKey) => {
		const { name, value } = e.target;
		const setFormData = formSetters[formKey].setFormData;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const clearFormData = (formKey) => {
		const setFormData = formSetters[formKey].setFormData;
		const initialFormData = formSetters[formKey].initialFormData;
		setFormData(initialFormData);
	};

	const deleteResumeItem = (formKey) => {
		/*
		- Deletes a resume item
		1. Pass in the formKey, indicating the type of item being deleted.
			Now create a copy of the items array without the item being deleted
		2. Set that new array as the new state! 
		NOTE: When you complete deleting an item, isEdit should be false since they are done editing.
		Rest assured since isEdit is set to false as the closeForm function helping us when deleting.
		*/
		let newItemArr = [...formSetters[formKey].itemList];
		let itemSetter = formSetters[formKey].setItemList;
		newItemArr.splice(editIndex, 1);
		itemSetter(newItemArr);
	};

	const submitForm = (e, formKey) => {
		/*
		- Submission can be either editing/saving changes to an existing 
			item or adding a new item
		1. Construct new item object from form data
		- If the user is editing an item:
			1. Replace the item in 'editIndex' with the 
				newItemObj that represents the new changes.
			2. Maintain the visibility attribute by getting a copy of the edited
				item object from an array.
			3. Then set isEdit to false, because we're now done 
				editing.
		- Else the user is adding a new item:
			1. Set isVisible to true since that's the default when adding	
			2. Then append the new item object to the end of an array that
				is a copy of the state array (itemList).
			3. Finally set the state

		NOTE: Notice how we set the a form data state, and in the object we have 'isVisible'.
			So keep in mind that the values for the states that track the 
			item forms will likely have isVisible attribute to them.
			This doesn't matter when creating form fields, but it 
			does matter in the resume section as we only trim strings 
		*/
		const formData = new FormData(e.target);
		let newItemObj = {};
		formData.forEach((value, key) => {
			newItemObj[key] = value;
		});

		let newItemList = [...formSetters[formKey].itemList];
		const setItemList = formSetters[formKey].setItemList;

		if (isEdit) {
			newItemObj.isVisible = newItemList[editIndex].isVisible;
			newItemList[editIndex] = newItemObj;
			setItemList(newItemList);
			setIsEdit(false);
		} else {
			newItemObj.isVisible = true;
			newItemList.push(newItemObj);
			setItemList(newItemList);
		}
		clearFormData(formKey);
	};

	return (
		<div id="app-container">
			<Header />
			<main id="app-main">
				<EditPanel
					loadExampleResume={loadExampleResume}
					clearResumeData={clearResumeData}
					clearFormData={clearFormData}
					formSetters={formSetters}
					onInputChange={onInputChange}
					personalFields={personalFields}
					schoolFields={schoolFields}
					jobFields={jobFields}
					submitForm={submitForm}
					setEditIndex={setEditIndex}
					isEdit={isEdit}
					setIsEdit={setIsEdit}
					deleteResumeItem={deleteResumeItem}
					activeForm={activeForm}
					setActiveForm={setActiveForm}
				/>
				<Resume
					personalFormData={personalFormData}
					schoolFormData={schoolFormData}
					jobFormData={jobFormData}
					schoolList={schoolList}
					jobList={jobList}
					isEdit={isEdit}
					editIndex={editIndex}
					activeForm={activeForm}
				/>
			</main>
			<Footer />
		</div>
	);
}

export default App;
