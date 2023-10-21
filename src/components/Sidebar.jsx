import "../styles/Sidebar.css";

import PropTypes from "prop-types";
import CustomButton from "./CustomButton";

/*

- itemName: title or name of the item that's going to show up on the sidebar
- isVisible: Boolean indicating the visibility of the item, which affects 
	which icon shows up on the visibility button
- onItemClick: Main functionality of clicking the item. In this case, this 
	would allow the user to edit the item in the application.

- toggleVisibility: Function that lets the user hide an item on the cv.



- How to toggle visibility: 
	1. Get the itemObj for that particular SidebarItem
	2. Change isVisible boolean to opposite value
	3. Get the setSchoolList or setItemList depending on what 
		you're setting. Get an array copy, replace it with 
		your new item obj

	4. Then set the new list for the state





*/

function SidebarItem({ itemName, isVisible, onItemClick, toggleVisibility }) {
	return (
		<div className="sidebar-list-item">
			<span className="sidebar-item-title">{itemName}</span>
			<div className="btn-container">
				<button className="edit-item-btn" onClick={onItemClick}>
					Edit
				</button>
				<CustomButton
					onClick={toggleVisibility}
					classList={["toggle-visibility-btn"]}
					iconKeyword={isVisible ? "visibility" : "visibility_off"}
				/>
			</div>
		</div>
	);
}
SidebarItem.propTypes = {
	itemName: PropTypes.string,
	isVisible: PropTypes.bool,
	onItemClick: PropTypes.func,
	toggleVisibility: PropTypes.func,
};

export { SidebarItem };
