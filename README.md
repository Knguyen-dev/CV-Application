# CV-Application

BOOK MARK: Webpack and vite don't work well together so there's no need
   to include webpack in this project. Right now work on creating the
   "components" folder in src for all of the components and the 
   "styles" folder in src for all of the css styles for those components.
   
Components: 
   1. One probably for adding sections of info. Like when adding a new school or job experience. Would probably be something like CVSection.

   2. A component for creating a form, 
   so CustomForm, makes sense. Probably pass in an array of objects that lists the parameters of the input. Maybe.

   3. CustomInput makes sense as we're going to make it so as the user changes stuff in the fields, it changes stuff on the CV in real time

   4. FormField could be one, where 
   it's a label and an input. Could be helpful when creating the forms

   5. I feel like CVSection could be a component. Like if they only have education and no work experience, we would only have a education section on the cv. Then in that education section we'd render the entries.




-   Create a new React project.

*   An application where as you're filling out a form, it creates a cv for you.

1. Think about how to structure your application into components. Your application should include:

2. A section to add general information like name, email and phone number.

3. A section to add your educational experience (school name, title of study and date of study)

4. A section to add practical experience (company name, position title, main responsibilities of your jobs, date from and until when you worked for that company)
   Be sure to include an edit and submit button for each section or for the whole CV. The submit button should submit your form and display the value of your input fields in HTML elements. The edit button should add back (display) the input fields, with the previously displayed information as values. In those input fields, you should be able to edit and resubmit the content. You’re going to make heavy use of state and props, so make sure you understood those concepts.

5. Create a components directory under your src directory and add your components.

6. Include a styles directory under your src directory for your CSS files. You’ll need to import these in the component files to use them.

7. Push the results and deploy them with any of the options mentioned below!

-   Designs for inspiration:
    1. https://sharkri.github.io/cv-application/
    2. https://rmathr.github.io/cv-project/
