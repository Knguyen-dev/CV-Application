import PropTypes from "prop-types";
import CustomButton from "../CustomButton";

import { FaTrash } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdDownload } from "react-icons/md";

/*
- Component that displays the various actions the user can do with their 
	resume, besides inputting in information. 
*/
function ResumeActions({ loadExampleResume, downloadResume, clearResume }) {
	return (
		<div className="resume-actions edit-section">
			<header className="edit-section-header">
				<h2>Resume Actions</h2>
			</header>
			<section className="edit-section-body">
				<div className="action-btns-container">
					<CustomButton
						btnText="Load Example Resume"
						classList={["load-example-btn", "button-shrink"]}
						onClick={loadExampleResume}
					/>

					<CustomButton
						btnText="Download"
						classList={["download-resume-btn", "button-shrink"]}
						iconKeyword="download"
						onClick={downloadResume}
						icon={<MdDownload fontSize={20} />}
					/>

					<CustomButton
						btnText="Clear Resume"
						classList={["clear-resume-btn", "button-shrink"]}
						onClick={clearResume}
						icon={<FaTrash />}
					/>
				</div>
			</section>
		</div>
	);
}
ResumeActions.propTypes = {
	loadExampleResume: PropTypes.func,
	downloadResume: PropTypes.func,
	clearResume: PropTypes.func,
};

export default ResumeActions;
