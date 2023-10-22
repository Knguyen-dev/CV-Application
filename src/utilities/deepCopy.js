// function for deep copying an array
function deepCopyArray(arr) {
	return arr.map((obj) => ({ ...obj }));
}

export default deepCopyArray;
