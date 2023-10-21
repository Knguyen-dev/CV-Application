// Special button component you can use for buttons that have
// an icon in them.
import PropTypes from "prop-types";

function CustomButton({ btnText, onClick, classList, iconKeyword }) {
	return (
		<button className={classList.join(" ")} onClick={onClick}>
			{iconKeyword ? (
				<span className="material-symbols-outlined">{iconKeyword}</span>
			) : null}
			<span className="button-text">{btnText}</span>
		</button>
	);
}
CustomButton.propTypes = {
	btnText: PropTypes.string,
	onClick: PropTypes.func,
	classList: PropTypes.array,
	iconKeyword: PropTypes.string,
};

export default CustomButton;
