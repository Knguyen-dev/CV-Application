import "../styles/App.css";

import { exampleResumeData, personalFormFields } from "./formData";
import EditPanel from "./EditPanel";
import Resume from "./Resume";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

/*
+ App: Main application component

- States:
1. personalFormData: Object that represents the current values of the personal info form.
    Keys are "inputID" from personalFormFields

personalFormData = {
	input_elementID_1: input value,
	input_elementID_2: another input value,
}


- Variables:
1. initialPersonalFormData: Initial object used to iteratively create the object 
    that tracks the values of the personal info form.
2. personalFields: Object, which is a copy of personalFormFields, but the 
    the value of each field is gotten from the state. As a result 
    each field object will have the current value of the form.


*/

function App() {
	// Create state object for tracking data from personal info form
	let initialPersonalFormData = {};
	personalFormFields.forEach((field) => {
		initialPersonalFormData[field.inputID] = "";
	});
	const [personalFormData, setPersonalFormData] = useState(
		initialPersonalFormData
	);

	// Create form fields for personal info form with state values
	const personalFields = personalFormFields.map((field) => {
		const fieldID = field.inputID;
		field.value = personalFormData[fieldID];
		return field;
	});

	// Create functions for clearing and loading entire resume with data
	const loadExampleResume = () => {
		setPersonalFormData(exampleResumeData.personalInfo);
	};

	const clearResume = () => {
		setPersonalFormData(initialPersonalFormData);
	};

	// Changes state of personalFormData on input change in personal
	const handlePersonalForm = (e) => {
		const inputID = e.target.id;
		const value = e.target.value;
		setPersonalFormData({
			...personalFormData,
			[inputID]: value,
		});
	};

	return (
		<div id="app-container">
			<Header />
			<main id="app-main">
				<EditPanel
					loadExampleResume={loadExampleResume}
					clearResume={clearResume}
					handlePersonalForm={handlePersonalForm}
					personalFields={personalFields}
				/>
				<Resume personalFormData={personalFormData} />
			</main>
			<Footer />
		</div>
	);
}

export default App;
