import "../styles/initialPageLoad.css"

import EditPanel from "./EditPanel"

function Header() {
    return (
        <header id="app-header">
            <h1 className="app-title-el">CV Maker</h1>
        </header>
    )
}

function Footer() {
    const currentYear = new Date().getFullYear()
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
    )
}

/*
Achieve design using css flex box and grid.

- For app-main use flexbox:
	1. Editing section
	2. Resume section

- Resume section


*/

function App() {
    return (
        <div id="app-container">
            <Header />
            <main id="app-main">
                <EditPanel />
                <p>Sample main content</p>
            </main>
            <Footer />
        </div>
    )
}

export default App
