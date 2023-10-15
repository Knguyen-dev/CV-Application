function Resume({ personalFormData }) {
	return (
		<div className="resume-section">
			<p>Personal Info Section</p>
			<p id="full-name-el">{personalFormData["input-full-name"]}</p>
			<p id="email-el">{personalFormData["input-email"]}</p>
			<p id="phone-number-el">{personalFormData["input-phone-number"]}</p>
			<p id="address-el">{personalFormData["input-address"]}</p>
		</div>
	);
}

export default Resume;
