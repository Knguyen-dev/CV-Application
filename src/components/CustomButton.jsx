// Special button component you can use for buttons that have
// an icon in them.
import PropTypes from "prop-types";

function CustomButton({ btnText, onClick, classList, icon }) {
	return (
		<button className={classList.join(" ")} onClick={onClick}>
			{icon}
			<span className="button-text">{btnText}</span>
		</button>
	);
}
CustomButton.propTypes = {
	btnText: PropTypes.string,
	onClick: PropTypes.func,
	classList: PropTypes.array,
	icon: PropTypes.element,
};

export default CustomButton;
