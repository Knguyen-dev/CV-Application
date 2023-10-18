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
		"full-name": "Luca Pizzaria",
		email: "LucaPiz@gmail.com",
		"phone-number": "555-555-5555",
		address: "1234 W Pizza Avenue",
	},

	schoolList: [
		{
			"school-name": "Parmesiano University",
			"degree-type": "Gastronomy",
			"start-date": "08/2014",
			"end-date": "09/2017",
			address: "123 S Parmesiano CT",
		},
	],
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

const schoolFormFields = [
	{
		name: "school-name",
		type: "text",
		label: "School",
		inputID: "input-school-name",
		placeholder: "Enter school / university",
		value: "",
	},
	{
		name: "degree-type",
		type: "text",
		label: "Degree",
		inputID: "input-degree-type",
		placeholder: "Enter Degree / Field Of Study",
		value: "",
	},
	{
		name: "start-date",
		type: "text",
		label: "Start Date",
		inputID: "input-start-date",
		placeholder: "Enter start date in format (mm/yyyy)",
		value: "",
	},
	{
		name: "end-date",
		type: "text",
		label: "End Date",
		inputID: "input-end-date",
		placeholder: "Enter end date in format (mm/yyyy)",
		value: "",
	},
	{
		name: "address",
		type: "text",
		label: "Address",
		inputID: "input-school-address",
		placeholder: "Enter address of respective school",
		value: "",
	},
];

export { exampleResumeData, personalFormFields, schoolFormFields };
