// function for deep copying an array
function deepCopyArray(arr) {
	// Check if the input is an array
	if (!Array.isArray(arr)) {
		return arr;
	}

	// Create a deep copy of the array and its objects
	return arr.map((item) => {
		if (typeof item === "object" && item !== null) {
			return deepCopyArray(item);
		} else {
			return item;
		}
	});
}

export default deepCopyArray;
