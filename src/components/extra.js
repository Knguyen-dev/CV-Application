// /*
// 	- NOTE: User could be editing something invisible, so we include all for the moment, which makes it
// 		easy for us to know our items are ordered correctly, then later when rendering we can just filter
// 		out the invisible ones.
// 		1. We're relying on index to find the edited one, so only including visible objects messes up
// 			index order.
// 		2. So by including both visible and non-visible school objects for right now, we can just
// 	*/
// let schoolObjects = [];
// for (const schoolObj of schoolList) {
// 	schoolObjects.push(schoolObj);
// }

// /*
// 	- If the user is currently editing an existing school:
// 		1. Set visibility of the object represented by form to the one being edited
// 		2. Replace the edited object in the schoolObjects list with the object representing
// 			the school in the form
// 	- Else if, they aren't editing but adding a school using the form, and the form isn't empty:
// 		1. Set visibility to true, meaning that schools items are visible by default.
// 		2. Then add the formSchoolObj to the schoolObjects array to be rendered.
// 	- Else: Just means they weren't editing and the form was empty, so we aren't
// 		going to render anything yet.
// 	*/
// if (isEdit) {
// 	formSchoolObj.isVisible = schoolObjects[editIndex].isVisible;
// 	schoolObjects[editIndex] = formSchoolObj;
// } else if (!formEmpty) {
// 	formSchoolObj.isVisible = true;
// 	schoolObjects.push(formSchoolObj);
// }

// // Prepare for rendering by filtering out all of the invisible school objects
// schoolObjects = schoolObjects.filter((schoolObj) => schoolObj.isVisible);

// Gets visible school objects for rendering
// function getSchoolObj() {

// }
