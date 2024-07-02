import html2pdf from "html2pdf.js";

// Generates a pdf and opens it into a new tab for the user
const generatePdf = () => {
	// Get our html element that
	const element = document.getElementById("resume");

	// Options for html2pdf
	const options = {
		// Options for jsPDF; this makes the pdf content sharper and not blurry
		jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
	};

	// Generate the PDF
	html2pdf()
		.from(element) // Specify element to convert
		.set(options) // Apply our html2pdf options
		.toPdf() // Convert the element to a PDF file
		.get("pdf") // We want to get the PDF object so that we can programmatically manipulate it.
		.then(function (pdf) {
			// Get a binary large object of the pdf file
			const pdfBlob = pdf.output("blob");

			// Create a data-url for that pdf blob
			const url = URL.createObjectURL(pdfBlob);

			// Open the pdf (data-url) in a new tab; allowing the user to save/download it
			window.open(url, "_blank");
		})
		.catch((err) => console.error("Error creating pdf: ", err));
};

export { generatePdf };
