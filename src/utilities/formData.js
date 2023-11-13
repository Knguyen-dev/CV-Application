import { v4 as uuidv4 } from "uuid";

function deepFreeze(object) {
	// Retrieve the property names defined on object
	const propNames = Reflect.ownKeys(object);
	// Freeze properties before freezing self
	for (const name of propNames) {
		const value = object[name];
		if (
			(value && typeof value === "object") ||
			typeof value === "function"
		) {
			deepFreeze(value);
		}
	}
	return Object.freeze(object);
}

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
			id: uuidv4(),
			"school-name": "Parmesiano University",
			"degree-type": "Gastronomy",
			"start-date": "08/2014",
			"end-date": "09/2017",
			address: "123 S Parmesiano CT",
			isVisible: true,
		},
		{
			id: uuidv4(),
			"school-name": "Hogwarts Technical College",
			"degree-type": "Culinary",
			"start-date": "02/2010",
			"end-date": "05/2014",
			address: "123 N Diagon Alley",
			isVisible: true,
		},
	],
	jobList: [
		{
			id: uuidv4(),
			"company-name": "Amazon & Sarah.",
			"position-title": "Data Engineer/Master",
			"start-date": "01/2006",
			"end-date": "01/2010",
			address: "555 North Numbers Avenue",
			isVisible: true,
			"job-description":
				"Overseer of handling and ensuring that data relating to and regarding sales was analyzed properly. And it was always handled properly",
		},
		{
			id: uuidv4(),
			"company-name": "Monopoly Inc.",
			"position-title": "Data Analyst",
			"start-date": "02/2010",
			"end-date": "05/2014",
			address: "123 South Boardwalk",
			isVisible: true,
			"job-description":
				"Crunched numbers and analyzed data for the company",
		},
		{
			id: uuidv4(),
			"company-name": "Color Corp.",
			"position-title": "Cybersecurity Data Expert",
			"start-date": "06/2014",
			"end-date": "Present",
			address: "1029 S Cookie Corner",
			isVisible: true,
			"job-description":
				"Oversaw and managed various cybersecurity practices related to protecting data. Also handled baking cookies on the weekend for the company as well.",
		},
	],
};

deepFreeze(exampleResumeData);

const jobFormFields = [
	{
		name: "company-name",
		type: "text",
		label: "Company Name",
		inputID: "input-company-name",
		placeholder: "Enter company name",
		value: "",
		isRequired: true,
	},
	{
		name: "position-title",
		type: "text",
		label: "Position",
		inputID: "input-position-title",
		placeholder: "Enter position title",
		value: "",
		isRequired: true,
	},
	{
		name: "start-date",
		type: "text",
		label: "Start Date",
		inputID: "input-job-start-date",
		placeholder: "Enter start date in format (mm/yyyy)",
		value: "",
		isRequired: true,
	},
	{
		name: "end-date",
		type: "text",
		label: "End Date",
		inputID: "input-job-end-date",
		placeholder: "Enter end date in format (mm/yyyy)",
		value: "",
		isRequired: true,
	},
	{
		name: "address",
		type: "text",
		label: "Address",
		inputID: "input-company-address",
		placeholder: "Enter address of respective school",
		value: "",
		isRequired: true,
	},
	{
		name: "job-description",
		type: "text",
		label: "Description",
		inputID: "input-job-description",
		placeholder: "Enter job description",
		value: "",
		isRequired: true,
	},
];

export { exampleResumeData, jobFormFields };
