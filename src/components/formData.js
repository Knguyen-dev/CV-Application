/*
- exampleResume: Object that contains example data. Each 
	key represents a section in the resume form, so 'personalInfo' relates to the personal info
	form. The data is organized in parallel to the personalFormFields, as the full name
	is the first item, email is second, and so on.

NOTE: If you're adding/removing form fields by modifying 
	personalFormFields, or similar, 

*/
const exampleResumeData = {
	personalInfo: {
		"input-full-name": "Luca Pizzaria",
		"input-email": "LucaPiz@gmail.com",
		"input-phone-number": "555-555-5555",
		"input-address": "1234 W Pizza Avenue",
	},
};

const personalFormFields = [
	{
		name: "full-name",
		type: "text",
		label: "Full name",
		inputID: "input-full-name",
		placeholder: "Enter full name",
		value: "",
	},
	{
		name: "email",
		type: "email",
		label: "Email",
		inputID: "input-email",
		placeholder: "Enter email address",
		value: "",
	},
	{
		name: "phone-number",
		type: "text",
		label: "Phone number",
		inputID: "input-phone-number",
		placeholder: "Enter phone number",
		value: "",
	},
	{
		name: "address",
		type: "text",
		label: "Address",
		inputID: "input-address",
		placeholder: "Enter address",
		value: "",
	},
];

export { exampleResumeData, personalFormFields };
