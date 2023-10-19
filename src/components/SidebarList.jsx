import PropTypes from "prop-types";

/*
- itemType: Could be "education" or "professional"


*/

// We need to also pass a function to the sidebar list
// for toggling visibility, which would probably just
// affect the schoolList state, or a parallel list
// affecting visibility

function SidebarItem({ item, itemType }) {
	return (
		<div className="sidebar-list-item">
			<span className="institution-name">
				{itemType === "education"
					? item["school-name"]
					: item["company-name"]}
			</span>
			<button className="toggle-visibility-btn">
				{item["isVisible"] ? "Hide" : "Show"}
			</button>
		</div>
	);
}
SidebarItem.propTypes = {
	item: PropTypes.object,
	itemType: PropTypes.string,
};

function SidebarList({ itemList, itemType }) {
	return (
		<ul className="sidebar-list">
			{itemList.map((item, index) => (
				<SidebarItem key={index} item={item} itemType={itemType} />
			))}
		</ul>
	);
}
SidebarList.propTypes = {
	itemList: PropTypes.array,
	itemType: PropTypes.string,
};

export default SidebarList;
