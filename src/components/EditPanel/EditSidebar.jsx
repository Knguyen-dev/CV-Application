import CustomButton from "../CustomButton";
import PropTypes from "prop-types";
/*
- Component that indicates and controls which of the two main tabs that 
	the user is currently on.

	"content": When this tab is active, all of the forms related to the 
		user will be displayed. So forms for personal info, the schools
		they went to, and their career experiences.
	
	"customize": When this tab is active, all of the components 
		relating to controlling the style of the resume will be shown instead.
		Such as editing the font-style of the resume.
*/
function EditSideBar({ tabType, onTabChange }) {
	const btnClassList = ["sidebar-btn", "button-shrink", "active-btn"];
	return (
		<div className="edit-sidebar edit-section">
			<CustomButton
				btnText="Content"
				onClick={() => onTabChange("content")}
				classList={
					tabType === "content"
						? btnClassList
						: btnClassList.slice(0, 2)
				}
				iconKeyword="toc"
			/>
			<CustomButton
				btnText="Customize"
				onClick={() => onTabChange("customize")}
				classList={
					tabType === "customize"
						? btnClassList
						: btnClassList.slice(0, 2)
				}
				iconKeyword="edit"
			/>
		</div>
	);
}
EditSideBar.propTypes = {
	tabType: PropTypes.string,
	onTabChange: PropTypes.func,
};

export default EditSideBar;
