import PropTypes from "prop-types";
/*
+ ResumeInfoItem: Component that represents the individual items in the 
    "Education" or "Professional Experience" section. For example, 
    a ResumeInfoItem can show a single school or job you attended, how long 
    you stayed there, and corresponding information related to that
    job or school.

- Conditional on start-end-dates so that the markup is generated when either one of the dates
	is being filled in. Without this, the markup appears and the hypen appears which is unusual. Now 
	Now even when other fields are being filled in, the markup for dates only appears 
	when either one of the dates are being filled in.
*/
function ResumeInfoItem({ itemType, itemData }) {
	const markupMap = {
		education: (
			<>
				<div className="resume-info-group resume-info-group-minor">
					{itemData["start-date"] || itemData["end-date"] ? (
						<p className="start-end-dates">
							{itemData["start-date"]} - {itemData["end-date"]}
						</p>
					) : null}
					<p className="institution-address">{itemData["address"]}</p>
				</div>
				<div className="resume-info-group resume-info-group-major">
					<p className="institution-name">
						{itemData["school-name"]}
					</p>
					<p className="degree-type">{itemData["degree-type"]}</p>
				</div>
			</>
		),
		job: (
			<>
				<div className="resume-info-group resume-info-group-minor">
					{itemData["start-date"] || itemData["end-date"] ? (
						<p className="start-end-dates">
							{itemData["start-date"]} - {itemData["end-date"]}
						</p>
					) : null}
					<p className="institution-address">{itemData["address"]}</p>
				</div>
				<div className="resume-info-group resume-info-group-major">
					<p className="institution-name">
						{itemData["company-name"]}
					</p>
					<p className="position-title">
						{itemData["position-title"]}
					</p>
					<p className="job-description">
						{itemData["job-description"]}
					</p>
				</div>
			</>
		),
	};

	return <div className="resume-info-item">{markupMap[itemType]}</div>;
}
ResumeInfoItem.propTypes = {
	itemType: PropTypes.string,
	itemData: PropTypes.object,
};

/*
+ ResumeSection: Represents entire section of a resume, for example a section listing a person's "Education" or "Professional"
    experiences.

- Parameters:
1. sectionTitle: Title of said section
2. itemType: Type of the section, so currently there are two types "education" and "professional". This parameter indicates
    what the data in itemDataList represents, and we can build the markup accordingly
3. itemDataList: An array of objects, with each object containing form data from either the education or professional form


*/
function ResumeSection({ sectionTitle, itemType, itemDataList }) {
	return (
		<section className="resume-section">
			<header className="resume-section-header">{sectionTitle}</header>
			<div className="resume-info-list">
				{itemDataList.map((itemData, index) => {
					return (
						<ResumeInfoItem
							key={index}
							itemType={itemType}
							itemData={itemData}
						/>
					);
				})}
			</div>
		</section>
	);
}
ResumeSection.propTypes = {
	sectionTitle: PropTypes.string,
	itemType: PropTypes.string,
	itemDataList: PropTypes.array,
};

export { ResumeSection, ResumeInfoItem };
