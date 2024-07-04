# CV-Application

## Description
A simple React application that lets users create a simple resume, and let those users see their changes in real time. After the user is done with making their resume, the application allows the user to to save their resume as a PDF file.

[Site Preview](https://knguyen-dev.github.io/CV-Application/)




# Credits:
1. [CV Application from SharkRi, main design inspiration](https://sharkri.github.io/cv-application/)




## Misc
- How to deploy vite react app to github pages
1. "npm install gh-pages --save-dev"; download github pages
2. In package.json do "predeploy: npm run build" and "deploy: gh-pages -d dist". Put these before "build: vite build".
3. In "vite.config.js" put "base: '/YOUR_REPONAME'" before "plugins: [react()]".
4. Finally do "npm run deploy" to create github pages branch. Then you can go to github website to set this as the source branch.
