import "../styles/EditPanel.css";
import { PersonalInfoForm } from "./Forms";

// Affects the content of the form
function EditSideBar() {
	return (
		<div className="edit-sidebar edit-section">
			<button className="content-btn button-shrink">
				<span className="material-symbols-outlined">toc</span>
				<span>Content</span>
			</button>
			<button className="edit-btn button-shrink">
				<span className="material-symbols-outlined">edit</span>
				<span>Customize</span>
			</button>
		</div>
	);
}

function ResumeActions() {
	return (
		<div className="resume-actions edit-section">
			<h2>Resume Actions</h2>
			<div className="action-btns-container">
				<button className="load-example-btn button-shrink">
					<span>Load Example Resume</span>
				</button>
				<button className="load-example-btn button-shrink">
					<span className="material-symbols-outlined">download</span>
					<span>Download</span>
				</button>
				<button className="clear-resume-btn button-shrink">
					<span className="material-symbols-outlined">delete</span>
					<span>Clear Resume</span>
				</button>
			</div>
		</div>
	);
}

function EditPanel() {
	return (
		<div className="edit-panel">
			<EditSideBar />
			<div className="form-section">
				<ResumeActions />

				<PersonalInfoForm />
			</div>
		</div>
	);
}

export default EditPanel;
