function FormButtons({ isEdit, deleteItem, closeForm }) {
	<div className="form-btn-container">
		<button
			type="button"
			className={`button-shrink delete-btn ${
				!isEdit ? "btn-hidden" : ""
			}`}
			onClick={() => {
				deleteItem();
				closeForm();
			}}
		>
			Delete
		</button>
		<div>
			<button
				type="button"
				className="button-shrink cancel-btn"
				onClick={closeForm}
			>
				Cancel
			</button>
			<button className="button-shrink save-btn" type="submit">
				Save
			</button>
		</div>
	</div>;
}

export default FormButtons;
