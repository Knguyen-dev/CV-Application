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
	const [editIndex, setEditIndex] = useState(0);
	const [isEdit, setIsEdit] = useState(false);

	// Create functions for clearing and loading entire resume with data
	const loadExampleResume = () => {
		setPersonalFormData(exampleResumeData.personalInfo);
		setSchoolList(exampleResumeData.schoolList);
	};

	// Clears resume of its user data
	const clearResumeData = () => {
		clearFormData("personalForm");
		clearFormData("schoolForm");
		setSchoolList([]);
	};

	const onInputChange = (e, formKey) => {
		const formSetters = {
			personalForm: setPersonalFormData,
			schoolForm: setSchoolFormData,
		};
		const { name, value } = e.target;
		const setFormData = formSetters[formKey];
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const clearFormData = (clearFormKey) => {
		/*
		- Responsible for reseting the states values that track
			the input of the forms.
			
		- clearFormKey: Key (string) that's related to clearing the 
			form's data in this function. For example "personalForm" is 
			the key that's used to clear the personal info form of its data.

		NOTE: Logic for using clearing the form data is put into one 
			function because it's repetitive, so we choose to 
			to utilize and pass around one function rather than multiple functions.
		*/
		const formSetters = {
			personalForm: setPersonalFormData,
			schoolForm: setSchoolFormData,
		};
		const formData = {
			personalForm: initialPersonalFormData,
			schoolForm: initialSchoolFormData,
		};
		const setter = formSetters[clearFormKey];
		const data = formData[clearFormKey];
		setter(data);
	};

	const submitSchoolForm = (e) => {
		/*
		- Submission can be either editing/saving changes to an existing 
			school, or adding a new school.
		
		1. Construct new school object from form data
		- If the user is editing a school:
			1. Replace the schoolObj in 'schoolIndex' with the 
				newSchoolObj that represents the new changes.
			2. Maintain the visibility attribute by getting a copy of the edited
				school object from an array.
			3. Then set isEdit to false, because we're now done 
				editing.

		- Else the user is adding a new school:
			1. Set isVisible to true since that's the default when adding	
			2. Then append the new school object to the end of an array that
				is a copy of the state array (schoolList).
			3. Finally set the state
		*/

		// Using FormData object, create our newSchoolObj from our form data
		const formData = new FormData(e.target);
		let newSchoolObj = {};
		formData.forEach((value, key) => {
			newSchoolObj[key] = value;
		});

		let newSchoolList = [...schoolList];
		if (isEdit) {
			newSchoolObj.isVisible = newSchoolList[editIndex].isVisible;
			newSchoolList[editIndex] = newSchoolObj;
			setSchoolList(newSchoolList);
			setIsEdit(false);
		} else {
			newSchoolObj.isVisible = true;
			newSchoolList.push(newSchoolObj);
			setSchoolList(newSchoolList);
		}
		clearFormData("schoolForm");
	};

	return (
		<div id="app-container">
			<Header />
			<main id="app-main">
				<EditPanel
					loadExampleResume={loadExampleResume}
					clearResumeData={clearResumeData}
					clearFormData={clearFormData}
					onInputChange={onInputChange}
					personalFields={personalFields}
					schoolFields={schoolFields}
					submitSchoolForm={submitSchoolForm}
					schoolList={schoolList}
					setSchoolList={setSchoolList}
					setSchoolFormData={setSchoolFormData}
					setEditIndex={setEditIndex}
					isEdit={isEdit}
					setIsEdit={setIsEdit}
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
