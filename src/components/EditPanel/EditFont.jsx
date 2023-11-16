import "../../styles/EditFont.css";
import PropTypes from "prop-types";
/*
- EditFont: This component is responsible for 
	changing the font on the resume div. Basically the idea 
	is each btn has the ability to change a state, and the 
	state represents a css class. Then we put set that 
	state's value as the resume div's class. 
- In this case we defined the font classes in index.css 
	and then we used them here. For this component 
	we lifted the state up to the parent because this 
	component isn't always being rendered, but we still 
	want to remember it's state.
*/
function EditFont({ fontClass, setFontClass }) {
	const fontBtns = [
		{
			btnText: "Arial",
			fontClass: "arial-font",
		},
		{
			btnText: "Times New Roman",
			fontClass: "times-new-roman-font",
		},
		{
			btnText: "Roboto",
			fontClass: "roboto-font",
		},
	];

	return (
		<div className="edit-section font-section">
			<header className="edit-section-header">
				<h2>Fonts</h2>
			</header>
			<section className="edit-section-body">
				{fontBtns.map((btnObj, index) => {
					return (
						<button
							key={index}
							className={`font-btn ${
								fontClass === btnObj.fontClass
									? "font-btn-active"
									: ""
							}`}
							onClick={() => setFontClass(btnObj.fontClass)}
						>
							{btnObj.btnText}
						</button>
					);
				})}
			</section>
		</div>
	);
}

EditFont.propTypes = {
	fontClass: PropTypes.string,
	setFontClass: PropTypes.func,
};

export default EditFont;
