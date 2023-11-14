"use strict";
import "../styles/App.css";

import { exampleResumeData } from "../utilities/formData";
import deepCopyArray from "../utilities/deepCopy";

import EditPanel from "./EditPanel/EditPanel";
import Resume from "./Resume/Resume";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function Header() {
	return (
		<header id="app-header">
			<h1 className="app-title-el">CV Maker</h1>
		</header>
	);
}

function Footer() {
	const currentYear = new Date().getFullYear();
	return (
		<footer id="app-footer">
			<p>Knguyen {currentYear}</p>
			<ul className="footer-nav">
				<li>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/Knguyen-dev/CV-Application.git"
					>
						<img
							src="src/assets/github-mark.svg"
							alt="github icon"
							className="link-icon"
						/>
					</a>
				</li>
			</ul>
		</footer>
	);
}

function App() {
	/*
	- Set up Personal form:
		1. personalFormData: State that tracks input of form
	*/
	const [personalFormData, setPersonalFormData] = useState({
		"full-name": "",
		email: "",
		"phone-number": "",
		address: "",
	});

	/*
	- Set up school form and array state to store those items:
	1. schoolFormData: State that tracks input of form
	2. schoolList: List to store school objects that the user saved into the application
	*/
	const [schoolFormData, setSchoolFormData] = useState({
		"school-name": "",
		"degree-type": "",
		"start-date": "",
		"end-date": "",
		address: "",
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
	const [jobFormData, setJobFormData] = useState({
		"company-name": "",
		"position-title": "",
		"start-date": "",
		"end-date": "",
		address: "",
		"job-description": "",
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

	const [fontClass, setFontClass] = useState("arial-font");
	const resumeRef = useRef(null);

	useEffect(() => {
		const resumeNode = resumeRef.current;
		resumeNode.classList.add(fontClass);
		return () => {
			resumeNode.classList.remove(fontClass);
		};
	}, [fontClass]);

	const formSetters = {
		/*
		- Set up a map that has all of the setters we want and related info that helps 
			their functionality.
		*/
		personalForm: {
			setFormData: setPersonalFormData,
		},
		schoolForm: {
			setFormData: setSchoolFormData,
			setItemList: setSchoolList,
			itemList: schoolList,
		},
		jobForm: {
			setFormData: setJobFormData,
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
		setFormData((formData) => {
			const blankFormData = {};
			for (const key in formData) {
				blankFormData[key] = "";
			}
			return blankFormData;
		});
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

	const saveItem = (e, formKey) => {
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
			newItemObj.id = newItemList[editIndex].id;
			newItemList[editIndex] = newItemObj;
			setIsEdit(false);
		} else {
			newItemObj.isVisible = true;
			newItemObj.id = uuidv4();
			newItemList.push(newItemObj);
		}
		setItemList(newItemList);
		clearFormData(formKey);
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
	const toggleItemVisibility = (formKey, itemObj, itemList) => {
		itemObj.isVisible = !itemObj.isVisible;
		const setItemList = formSetters[formKey].setItemList;
		setItemList([...itemList]);
	};

	/*
	+ Prepares individual resume item to be edited.
	*/
	const editItem = (formKey, index, itemList) => {
		setActiveForm(formKey);
		setEditIndex(index);
		formSetters[formKey].setFormData(itemList[index]);
		setIsEdit(true);
	};

	return (
		<div id="app-container">
			<Header />
			<main id="app-main">
				<EditPanel
					loadExampleResume={loadExampleResume}
					clearResumeData={clearResumeData}
					closeForm={closeForm}
					toggleItemVisibility={toggleItemVisibility}
					editItem={editItem}
					clearFormData={clearFormData}
					formSetters={formSetters}
					onInputChange={onInputChange}
					personalData={personalFormData}
					schoolData={schoolFormData}
					jobData={jobFormData}
					saveItem={saveItem}
					setEditIndex={setEditIndex}
					isEdit={isEdit}
					setIsEdit={setIsEdit}
					deleteResumeItem={deleteResumeItem}
					activeForm={activeForm}
					setActiveForm={setActiveForm}
					setFontClass={setFontClass}
					fontClass={fontClass}
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
					ref={resumeRef}
				/>
			</main>
			<Footer />
		</div>
	);
}

export default App;
