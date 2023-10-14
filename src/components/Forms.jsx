/*
We want a form for person info,
education, and professional experience.

Would it be possible to create these 
all with one component


CustomForm(): We pass in an object 
containing info for the fields of the form. 
We'll nest it in an edit-section div so that we 
at least can have control on what to put on the header and below the form. The input 
fields will need to be custom as well so that we can do that onchange, I think.

BOOK MARK: Scratch the custom form idea for now. Right now just make the 3 separate components for 
    the Personal Details/info, education, and professional experience. Let's try to get the design and 
    set up right for how does states correctly, before we try to make things more reusable. 

    I'd recommend after setting up and designing the first form, create corresponding 
    text elements in the 'resume-section' so that we can start testing out states. If we
    can figure that out, then that's a big step.

*/

import "../styles/Forms.css";

// function CustomForm({elementID, formFields}) {
// 	return (
// 		<form id={elementID}></form>
// 	)

// }

function PersonalInfoForm({ isOpen, handleIsOpen }) {
	return (
		<div className="edit-section">
			<header>
				<h2>Personal Details</h2>
				<button
					className="drop-down-btn button-shrink"
					onClick={() => handleIsOpen(!isOpen)}
				>
					{isOpen ? "Less" : "More"}
				</button>
			</header>

			{isOpen ? (
				<form id="personal-info-form" className="custom-form">
					<div className="input-group">
						<label htmlFor="input-full-name">
							<span className="label-text">Full name</span>
						</label>
						<input
							type="text"
							name="full-name"
							id="input-full-name"
							placeholder="Enter full name"
						/>
					</div>
					<div className="input-group">
						<label htmlFor="input-email">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							name="email"
							id="input-email"
							placeholder="Enter email"
						/>
					</div>
					<div className="input-group">
						<label htmlFor="input-phone-number">
							<span className="label-text">Phone Number</span>
						</label>
						<input
							type="text"
							name="phone-number"
							id="input-phone-number"
							placeholder="Enter phone number"
						/>
					</div>
					<div className="input-group">
						<label htmlFor="input-address">
							<span className="label-text">Address</span>
						</label>
						<input
							type="text"
							name="address"
							id="input-address"
							placeholder="Enter address"
						/>
					</div>
				</form>
			) : null}
		</div>
	);
}

/*
- CustomForm: Component that allows us to create a customized form with some number of fields. Since 
    we want the state of the form component, and the state on the resume to update together, it's 
    a good idea to lift their states up. So CustomForm probably isn't going to have it's own state, but it's going 
    to rely on some parent's state. 


1. formFields: Would be an array of objects that detail what the form would be.
const formFields = [
    {
        name: "first-name"
        type: "text",
        label: "First Name",
        inputID: "input-first-name",
        isRequired: true,
    }
    // Add more fields as needed
]

2. Likely going to be a state setter to update the state of form data 


*/

// function CustomForm({ formFields, onChange }) {
//     // Now use the formFields object we got earlier to iteratively create our form fields
//     return (
//         <form>
//             {formFields.map((field) => {
//                 <div className="form-field-container">
//                     <label key={field.name} htmlFor={field.inputID}>
//                         {field.label}
//                     </label>
//                     <input
//                         name={field.name}
//                         type={field.type}
//                         id={field.inputID}
//                         onChange={handleChange}
//                     />
//                 </div>;
//             })}
//             <button type="submit">Submit</button>
//         </form>
//     );
// }
// export default CustomForm;

export { PersonalInfoForm };
