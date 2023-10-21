import "../styles/App.css";

import {
	schoolFormFields,
	exampleResumeData,
	personalFormFields,
} from "./formData";
import EditPanel from "./EditPanel";
import Resume from "./Resume";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

/*
+ App: Main application component

- States:
1. personalFormData: Object that represents the current values of the personal info form.
    Keys are "name" attributes of the inputs, which can be seen from formData.js

personalFormData = {
	input_name_1: input value,
	input_name_2: another input value,
}


- Variables:
1. initialPersonalFormData: Initial object used to iteratively create the object 
    that tracks the values of the personal info form.
2. personalFields: Object, which is a copy of personalFormFields, but the 
    the value of each field is gotten from the state. As a result 
    each field object will have the current value of the form.


*/

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
	- Set up school form and school storage:
	1. initialSchoolFormData: Object, which is a copy of the state
		but the values are empty strings. Good for reseting form fields.
	2. schoolFormData: State that tracks input of form
	3. schoolFields: Form fields that will be rendered that 
		also reflect the input values of the state
	4. schoolList: List to store school objects that the user saved into the application
	5. editIndex: Boolean to indicate which school object is being edited in schoolList
	6. isEdit: Boolean that indicates whether the user is editing an existing school object or 
		adding a new one.
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
	- Set up variables to track when the user is editing and 
		the index of the item that they're editing.
	*/
	const [editIndex, setEditIndex] = useState(0);
	const [isEdit, setIsEdit] = useState(false);

	/*
	- Set up a map that has all of the setters we want and related info that helps 
		their functionality.
	
	NOTE: Keeps things all in one place, and when we want to pass 
		things down, we can just pass down this object.
	*/

	const formSetters = {
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
	};

	/*
	- Create functions for clearing and loading entire resume with data

	1. First clear resume data, this way we can clear 
		form data and make it so the user isn't in edit mode anymore.
	2. Then load in example data
	*/
	const loadExampleResume = () => {
		clearResumeData();
		setPersonalFormData(exampleResumeData.personalInfo);
		setSchoolList(exampleResumeData.schoolList);
	};

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
	const clearResumeData = () => {
		clearFormData("personalForm");
		clearFormData("schoolForm");
		setSchoolList([]);
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

	/*
	- Deletes a resume item
	1. Pass in the formKey, indicating the type of item being deleted.
		Now create a copy of the items array without the item being deleted
	2. Set that new array as the new state! 
	NOTE: When you complete deleting an item, isEdit should be false since they are done editing.
	Rest assured since isEdit is set to false as the closeForm function helping us when deleting.
	*/
	const deleteResumeItem = (formKey) => {
		let newItemArr = [...formSetters[formKey].itemList];
		let itemSetter = formSetters[formKey].setItemList;
		newItemArr.splice(editIndex, 1);
		itemSetter(newItemArr);
	};

	const submitForm = (e, formKey) => {
		/*
		- Submission can be either editing/saving changes to an existing 
			item or adding a new item
		1. Construct new school object from form data
		- If the user is editing an item:
			1. Replace the item in 'editIndex' with the 
				newItemObj that represents the new changes.
			2. Maintain the visibility attribute by getting a copy of the edited
				item object from an array.
			3. Then set isEdit to false, because we're now done 
				editing.
		- Else the user is adding a new item:
			1. Set isVisible to true since that's the default when adding	
			2. Then append the new school object to the end of an array that
				is a copy of the state array (itemList).
			3. Finally set the state
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
					submitForm={submitForm}
					setEditIndex={setEditIndex}
					isEdit={isEdit}
					setIsEdit={setIsEdit}
					deleteResumeItem={deleteResumeItem}
				/>
				<Resume
					personalFormData={personalFormData}
					schoolList={schoolList}
					schoolFormData={schoolFormData}
					isEdit={isEdit}
					editIndex={editIndex}
				/>
			</main>
			<Footer />
		</div>
	);
}

export default App;
