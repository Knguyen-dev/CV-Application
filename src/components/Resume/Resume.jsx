import PropTypes from "prop-types";
import { forwardRef } from "react";
import { ResumeSection } from "./ResumeSection";
import "../../styles/Resume.css";

/*
+ Resume component will render the resume DOM node and handle 
	the rendering logic for showing resume items and other user info.

- Using isEdit, we know whether or not they're editing an existing object, and what item 
	they're editing. 
- .trim(): Using .trim() so that the application doesn't render any new elements 
	on the resume when the user just puts in spaces.

- formInfo: We use this object to more flexibly know which 
	of the item forms the user is accessing. An item form is a 
	form that lets the user add an item to the resume. So with 
	this formInfo object we can more easily handle rendering logic 
	regardless of the item form, and regardless of whether they're 
	editing or not.

	NOTE: itemList in formInfo should be a copy of the state so 
		we don't accidentally mess with the original state arrays.
*/
const Resume = forwardRef(function Resume(props, ref) {
	// Personal Form field values
	const fullName = props.personalFormData["full-name"].trim();
	const email = props.personalFormData["email"].trim();
	const phoneNumber = props.personalFormData["phone-number"].trim();
	const address = props.personalFormData["address"].trim();

	const formInfo = {
		schoolForm: {
			formData: props.schoolFormData,
			itemList: [...props.schoolList],
		},
		jobForm: {
			formData: props.jobFormData,
			itemList: [...props.jobList],
		},
	};

	/*
	- If a form is active:
	1. Get the respective form data state value, and list of existing resume items created by that form.
	2. Load formItemObj with the current values of the active form it's tracking.
	3. Check if the active has empty input or not.
	4. Check if the user is currently editing an existing item on the 
		active form, else they're trying to add a new item to the resume.


	- If isEdit (the user is currently editing):
	1. Set the isVisible attribute of the formItemObj to the isVisible attribute 
		of the item they're editing. As a result if the item being edited is 
		visible, user will be able to see the edits on the resume. Else, the 
		user won't be able to see their edits since the item was originally invisible,
		however the applicatin is still keeping track of the changes the user is 
		making.
	2. Put that formItemObj in the index position of where the user was editing 
		their original item, so now when being shown on the resume, the edits are taking 
		place where the edited item used to be.

	- Else if the form isn't empty:
	1. Make sure our formItemObj, which is used to represent and render 
		an unsaved form item that the user wants to add, is visible and 
		push it to the array so that the resume can display the info of the 
		unsaved item.

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
	*/
	if (props.activeForm) {
		const formData = formInfo[props.activeForm].formData;

		let formItemObj = {};
		for (const key in formData) {
			// Only trim strings
			if (typeof formData[key] === "string")
				formItemObj[key] = formData[key].trim();
		}

		const isEmptyForm = Object.values(formItemObj).every(
			(value) => value === ""
		);

		if (props.isEdit) {
			formItemObj.isVisible =
				formInfo[props.activeForm].itemList[props.editIndex].isVisible;
			formInfo[props.activeForm].itemList[props.editIndex] = formItemObj;
		} else if (!isEmptyForm) {
			formItemObj.isVisible = true;
			formInfo[props.activeForm].itemList.push(formItemObj);
		}
	}

	// Filter item lists so that they only contain visible items
	for (const key in formInfo) {
		formInfo[key].itemList = formInfo[key].itemList.filter(
			(itemObj) => itemObj.isVisible
		);
	}

	return (
		<div id="resume" ref={ref}>
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
							<p id="address-el">
								{props.personalFormData["address"]}
							</p>
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
						sectionTitle="Experience"
						itemType="job"
						itemDataList={formInfo["jobForm"].itemList}
					/>
				) : null}
			</main>
		</div>
	);
});

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
