import html2canvas from "html2canvas";

function saveAsImage() {
	const element = document.querySelector("#resume");

	// Define the options for html2canvas
	const options = {
		scale: 2, // Increase the scale for higher quality (e.g., 2 for 2x resolution)
		useCORS: true, // Enable CORS for cross-origin images
	};

	/*
	- On mobile screen we still want the user to download a wide sizeable image for their resume.
		Make a clone of the resume element and set its width to 800px, a good size. Then 
		append it to the body, but make it hidden. Now we'll be able to access it 
		and download it as an image
	*/
	const clonedElement = element.cloneNode(true);
	clonedElement.style.width = "800px";
	clonedElement.style.position = "absolute";
	clonedElement.style.top = "-9999px";
	document.body.appendChild(clonedElement);

	// Use html2canvas to capture the content of the div as an image
	html2canvas(clonedElement, options).then((canvas) => {
		// Convert the canvas to a data URL
		const imgData = canvas.toDataURL("image/png");

		// Create an anchor element to download the image
		const link = document.createElement("a");
		link.href = imgData;
		link.download = "resume.png";
		link.click();
	});
}

export default saveAsImage;
