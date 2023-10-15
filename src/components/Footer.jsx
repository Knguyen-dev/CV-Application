function Footer() {
	const currentYear = new Date().getFullYear();
	return (
		<footer id="app-footer">
			<p>Knguyen {currentYear}</p>
			<ul className="footer-nav">
				<li>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/Knguyen-dev/CV-Application.git"
					>
						<img
							src="src/assets/github-mark.svg"
							alt="github icon"
							className="link-icon"
						/>
					</a>
				</li>
			</ul>
		</footer>
	);
}

export default Footer;
