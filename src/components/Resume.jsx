import PropTypes from "prop-types";
import { ResumeSection, ResumeInfoItem } from "./ResumeSection";

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
	schoolList,
	schoolFormData,
	isEdit,
	editIndex,
}) {
	// Personal Form Fields
	const fullName = personalFormData["full-name"].trim();
	const email = personalFormData["email"].trim();
	const phoneNumber = personalFormData["phone-number"].trim();
	const address = personalFormData["address"].trim();

	/*
	- 1. Education Form fields, put inside an object representing a school
	- 2. formEmpty then discerns whether all of the fields are empty, if so then we won't send this object to be rendered
	 as a ResumeInfoItem. This is to get the same effect seen in personal-details, as if there's just blank space we won't render
	any markup so the resume's layout doesn't have empty markup tags.
	*/
	const formSchoolObj = {
		"school-name": schoolFormData["school-name"].trim(),
		"degree-type": schoolFormData["degree-type"].trim(),
		"start-date": schoolFormData["start-date"].trim(),
		"end-date": schoolFormData["end-date"].trim(),
		address: schoolFormData["address"].trim(),
	};

	const formEmpty = Object.values(formSchoolObj).every(
		(value) => value === ""
	);

	// Get an array of all of the existing school objects
	let schoolObjects = [...schoolList];

	/*
	- If Editing, we want to show real time edits of the existing school object: 
		1. Copy over the isVisible attribute from the existing 
		2. Replace the edited object in the schoolObjects list with the object representing
 			the school in the form. By doing this we make sure that the edits are going to
			be rendered after every change of the school form.
	- Else if, they aren't editing but adding a school using the form, and the form isn't empty:
 		1. Set visibility to true, meaning that schools items are visible by default.
 		2. Then add the formSchoolObj to the schoolObjects array to be rendered.
 	- Else: Just means they weren't editing and the form was empty, so we aren't
 		going to mess with the schoolObjects array or push anything to it unlike the former two paths.
	*/

	if (isEdit) {
		formSchoolObj.isVisible = schoolObjects[editIndex].isVisible;
		schoolObjects[editIndex] = formSchoolObj;
	} else if (!formEmpty) {
		formSchoolObj.isVisible = true;
		schoolObjects.push(formSchoolObj);
	}

	// Ensure school objects only has visible school items
	schoolObjects = schoolObjects.filter((schoolObj) => schoolObj.isVisible);

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
				{schoolObjects.length != 0 ? (
					<ResumeSection
						sectionTitle="Education"
						itemType="education"
						itemDataList={schoolObjects}
					/>
				) : null}
			</main>
		</div>
	);
}

Resume.propTypes = {
	personalFormData: PropTypes.object,
	schoolFormData: PropTypes.object,
	schoolList: PropTypes.array,
	isEdit: PropTypes.bool,
	editIndex: PropTypes.number,
};

export default Resume;
