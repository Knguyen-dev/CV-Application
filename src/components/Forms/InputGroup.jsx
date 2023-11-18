import PropTypes from "prop-types";
import "../../styles/InputGroup.css";
function InputGroup({
	id,
	placeholder,
	type,
	labelText,
	onChange,
	value,
	name,
	required,
	optional,
	recommended,
}) {
	return (
		<div className="input-group">
			<label htmlFor={id}>
				<span className="label-text">{labelText}</span>
				{optional && <span className="optional-text">optional</span>}
				{recommended && (
					<span className="recommended-text">recommended</span>
				)}
				{required && <span className="required-text">required</span>}
			</label>

			{type === "textarea" ? (
				<textarea
					id={id}
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					name={name}
					required={required ? true : false}
				></textarea>
			) : (
				<input
					type={type}
					id={id}
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					name={name}
					required={required ? true : false}
				/>
			)}
		</div>
	);
}

InputGroup.propTypes = {
	id: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	labelText: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	name: PropTypes.string,
	required: PropTypes.bool,
	optional: PropTypes.bool,
	recommended: PropTypes.bool,
};

export default InputGroup;
