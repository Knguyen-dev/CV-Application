import PropTypes from "prop-types";
import { ResumeSection } from "./ResumeSection";

import "../styles/Resume.css";

/*
.trim(): Using .trim() so that the application doesn't render any new elements 
	on the resume when the user just puts in spaces.

BOOK MARK: 
	1. Now need to focus on logic for adding new schools
	2. Then focus on editing logic. Also make sure to 
	take inspiration from or transfer logic from earlier
*/

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
			itemList: [...schoolList],
		},
		jobForm: {
			formData: jobFormData,
			itemList: [...jobList],
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
