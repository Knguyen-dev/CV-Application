import PropTypes from "prop-types";
import "../styles/Resume.css";

/*
.trim(): Using .trim() so that the application doesn't render any new elements 
	on the resume when the user just puts in spaces.


*/

function Resume({ personalFormData, schoolFormData }) {
	const fullName = personalFormData["full-name"].trim();
	const email = personalFormData["email"].trim();
	const phoneNumber = personalFormData["phone-number"].trim();
	const address = personalFormData["address"].trim();

	return (
		<div className="resume">
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
							<p id="address-el">{personalFormData["address"]}</p>
						</div>
					) : null}
				</div>
			</header>
			<main className="resume-body">
				<section className="resume-section resume-education">
					<header className="resume-section-header">Education</header>
					<div className="resume-info-list education-info">
						<div className="resume-info-item">
							<div className="resume-info-group resume-info-group-minor">
								<p className="start-end-dates">
									08/2020 - Present
								</p>
								<p className="school-address">
									New York City, US
								</p>
							</div>
							<div className="resume-info-group resume-info-group-major">
								<p className="institution-name school-name">
									School 1
								</p>
								<p className="degree-type">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Nisi temporibus voluptatum
									ratione!
								</p>
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Eveniet nostrum cum
									accusantium sint illo fugit, ex fuga atque
									ut culpa!
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

Resume.propTypes = {
	personalFormData: PropTypes.object,
	schoolFormData: PropTypes.object,
};

export default Resume;
