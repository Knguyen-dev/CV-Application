import PropTypes from "prop-types";
import { ResumeSection } from "./ResumeSection";
import "../styles/Resume.css";

function Resume({
	personalFormData,
	schoolFormData,
	jobFormData,
	schoolList,
	jobList,
	isEdit,
	editIndex,
	activeForm,
}) {
	// Personal Form Fields
	const fullName = personalFormData["full-name"].trim();
	const email = personalFormData["email"].trim();
	const phoneNumber = personalFormData["phone-number"].trim();
	const address = personalFormData["address"].trim();

	// Create an object of form data and form items
	const formInfo = {
		schoolForm: {
			formData: schoolFormData,
			itemList: schoolList,
		},
		jobForm: {
			formData: jobFormData,
			itemList: jobList,
		},
	};

	/*
	- If a form is active:
	1. Get the respective form data state value, and
		list of existing resume items created by that form
	
	2. Load formItemObj with the current values of the active form it's tracking

	3. Check if the active has empty input or not

	4. Check if the user is currently editing an existing item on the 
		active form, else they're trying to add a new item to the resume

	NOTE: 
		- The main point of this is formItemObj, which will be 
		the thing we use to render the user's edits on the 
		form in real time! This object takes in state data, and 
		each change in input will change the state, which is 
		how we're able to do real-time rendering.

		- We use activeForm to know which item they 
		are adding in. So if they're on the education form, we 
		know to render the resume as if they're adding 
		a new school. If activeForm doesn't equal anything, we 
		don't have to worry about rendering their edits with 
		formItemObj because they currently don't havea form open.


		- Using isEdit, we know whether or not 
		they're editing an existing object, and what item 
		they're editing. 
		- .trim(): Using .trim() so that the application doesn't render any new elements 
		on the resume when the user just puts in spaces.
	*/
	if (activeForm) {
		const formData = formInfo[activeForm].formData;

		let formItemObj = {};
		for (const key in formData) {
			// Only trim strings
			if (typeof formData[key] === "string")
				formItemObj[key] = formData[key].trim();
		}

		const isEmptyForm = Object.values(formItemObj).every(
			(value) => value === ""
		);

		if (isEdit) {
			formItemObj.isVisible =
				formInfo[activeForm].itemList[editIndex].isVisible;
			formInfo[activeForm].itemList[editIndex] = formItemObj;
		} else if (!isEmptyForm) {
			formItemObj.isVisible = true;
			formInfo[activeForm].itemList.push(formItemObj);
		}
	}

	// Filter item lists so that they only contain visible items
	for (const key in formInfo) {
		formInfo[key].itemList = formInfo[key].itemList.filter(
			(itemObj) => itemObj.isVisible
		);
	}

	return (
		<div className="resume">
			<header className="personal-details">
				{fullName ? (
					<h1 className="resume-name" id="full-name-el">
						{fullName}
					</h1>
				) : null}

				<div className="resume-contact-info">
					{email ? (
						<div className="contact-section">
							<span className="material-symbols-outlined">
								mail
							</span>
							<p id="email-el">{email}</p>
						</div>
					) : null}

					{phoneNumber ? (
						<div className="contact-section">
							<span className="material-symbols-outlined">
								call
							</span>
							<p id="phone-number-el">{phoneNumber}</p>
						</div>
					) : null}

					{address ? (
						<div className="contact-section">
							<span className="material-symbols-outlined">
								location_on
							</span>
							<p id="address-el">{personalFormData["address"]}</p>
						</div>
					) : null}
				</div>
			</header>
			<main className="resume-body">
				{formInfo["schoolForm"].itemList.length != 0 ? (
					<ResumeSection
						sectionTitle="Education"
						itemType="education"
						itemDataList={formInfo["schoolForm"].itemList}
					/>
				) : null}
				{formInfo["jobForm"].itemList.length != 0 ? (
					<ResumeSection
						sectionTitle="Education"
						itemType="job"
						itemDataList={formInfo["jobForm"].itemList}
					/>
				) : null}
			</main>
		</div>
	);
}

Resume.propTypes = {
	personalFormData: PropTypes.object,
	schoolFormData: PropTypes.object,
	jobFormData: PropTypes.object,
	schoolList: PropTypes.array,
	jobList: PropTypes.array,
	isEdit: PropTypes.bool,
	editIndex: PropTypes.number,
	activeForm: PropTypes.string,
};

export default Resume;
