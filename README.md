# CV-Application

- Description: A react application that lets you create a simple 
    CV/Resume.

-   Designs for inspiration:
    1. https://sharkri.github.io/cv-application/
    2. https://rmathr.github.io/cv-project/

- How to deploy vite react app to github pages
    1. "npm install gh-pages --save-dev"; download github pages
    2. In package.json do "predeploy: npm run build" and "deploy: gh-pages -d dist". Put these before "build: vite build".
    3. In "vite.config.js" put "base: '/YOUR_REPONAME'" before "plugins: [react()]".
    4. Finally do "npm run deploy" to create github pages branch. Then you can go to github website to set this as the source branch.

- Potential improvements:
    
    1. set font buttons are overriding the sample-resume-class. We want 
        it so that it only adds and removes a font class, and not other classes.

