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
	- Create state object for tracking data from personal info form
	
	
	*/

	let initialPersonalFormData = {};
	personalFormFields.forEach((field) => {
		initialPersonalFormData[field.name] = "";
	});
	const [personalFormData, setPersonalFormData] = useState(
		initialPersonalFormData
	);
	// Create form fields for personal info form with state values
	const personalFields = personalFormFields.map((field) => {
		field.value = personalFormData[field.name];
		return field;
	});

	/*
	- Create state object for tracking data in education form
	
	
	- schoolFormData: Current data in the education field. 
		So this could be when the user is editing, adding a new
		one, etc.

	- schoolList: An array (state) that holds all of the schools that 
		the user has entered for their resume. So this 
		should be an array of objects. I'm just thinking it should be 
		a state since we need this data across multiple renders. Like 
		obviously it could just be a regular array located outside of a component,
		but since we're using react this is probably better.

	
	- schoolIndex: When editing they're going to select a school from the list.
		The index should correspond to the school they selected to be edited.
		This is so that we can apply changes from schoolFormData into 
		our schoolList, if the user submits the form. Probably 
		also needed so that we can target elements for that particular 
		school, so I'm guessing the other school elements will get 
		their info from the schoolList state, but the targeted one 
		will use the stuff from schoolFormData, I'm guessing.

	- isEdit: To indicate whether the user is editing an existing school.
		A big difference is when the user isn't editing, they 
		only have the "Cancel" and "Save" buttons. One for closing 
		and cancelling the form, and the other for submitting and adding 
		the school to the resume. If 'isEdit' then the "Delete" button
		should be available, and it'll delete the selected school
		from schoolList.


	NOTE: I have a feeling index and isEdit can apply to also 
	to professional experience form, but we'll have to make sure only
	either the education form or the experience form is active. But that's really
	far ahead.





	*/

	// Create state for tracking school form data, then create the fields to be rendered in school form
	let initialSchoolFormData = {};
	schoolFormFields.forEach((field) => {
		initialSchoolFormData[field.name] = "";
	});
	const [schoolFormData, setSchoolFormData] = useState(initialSchoolFormData);
	const schoolFields = schoolFormFields.map((field) => {
		field.value = schoolFormData[field.name];
		return field;
	});

	// Create list to store schools that the user saved into the application
	const [schoolList, setSchoolList] = useState([]);

	// Create state to track the index of the school that the form is focusing on.
	const [schoolIndex, setSchoolIndex] = useState(0);

	// Create state to track whether the user is editing an existing school or not
	const [isEdit, setIsEdit] = useState(false);

	// Create functions for clearing and loading entire resume with data
	const loadExampleResume = () => {
		setPersonalFormData(exampleResumeData.personalInfo);
	};

	const clearResume = () => {
		setPersonalFormData(initialPersonalFormData);
	};

	// Changes state of personalFormData on input change in personal
	const handlePersonalForm = (e) => {
		const { name, value } = e.target;
		setPersonalFormData({
			...personalFormData,
			[name]: value,
		});
	};

	// On input change function for school form
	const handleSchoolForm = (e) => {
		const { name, value } = e.target;
		setSchoolFormData({
			...schoolFormData,
			[name]: value,
		});
	};

	// const submitSchoolForm = (e) => {...}

	// function deleteSchool(...) {...}

	return (
		<div id="app-container">
			<Header />
			<main id="app-main">
				<EditPanel
					loadExampleResume={loadExampleResume}
					clearResume={clearResume}
					handlePersonalForm={handlePersonalForm}
					personalFields={personalFields}
					handleSchoolForm={handleSchoolForm}
					schoolFields={schoolFields}
				/>
				<Resume personalFormData={personalFormData} />
			</main>
			<Footer />
		</div>
	);
}

export default App;
