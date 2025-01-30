# blog_api_backend-TOP
> [!NOTE]
> This is a REST-ish API. In the future I plan to refactor to RESTful, but it's not a priority.

> [!IMPORTANT]
> This is only the 	**backend** of the project. Be sure to also visit [frontend visitor](https://github.com/Isutomu/blog_api_visitor-TOP) and [frontend admin](https://github.com/Isutomu/blog_api_admin-TOP).

> [!CAUTION]
> This project is purely meant to be used as a tool for self-improvement, so I sincerely recommend you to not use this. But, in case you do decide to use it either way, please do credit me.

This is the backend of the project [Blog API](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api) from TOP.
The notable abscence of commits is due to the fact that this project was originally hosted on this [GitHub Repository](https://github.com/Isutomu/blog_api-TOP).

## Pointlessly long preface
I ended up splitting the previously mentioned respository on three because deploying was considerably easier this way, and so it was maintaining it to be honest (try to be on the level of a junior programmer and deal with essentially three projects in one VSCODE window).\
I also decided to transpose this into a new repository by directly uploading the files, as at the time this seemed like the easiest way to do it.

This project is gonna be further expanded beyond the scope of the original TOP especification (also catch up with some aspects that I deliberately did not implement at the time).
The issues with the current code are going to be on the "issues" tab, so here I am going to limit myself to disclosure the future features.\
Both (README and issues) are going to be updated as the times goes on, so if you've arrived here in different points in times that is why they seem bigger than before.

There is no particular reason why I chose this project to maintain besides this being my 1st fullstack project.

## Future features

> [!IMPORTANT]
> Modifiers ("not priority" and the like) don't imply importance. Most of the time they simply mean that I thought they were too difficult to tackle for now.

- Set up cors with whitelist for the currently deployed frontends
- Implement other more obvious security measures by  proper configuring (and enabling) the helmet middleware
- Test the current security measures and thicken them as needed (measures with be listed below after implementation)
- (Not priority) Implement authentication for the currently unprotected routes
- (Not priority) Change the authentication method for a more roubst (or make the current JWT implementation more robust)
- Refactor folder structure
- Migrate from commonJS to ES6
- (Not priority) Generate documentation of the API (automatic? manual? automatic with manual touch ups?)
- (Not priority) Convert to RESTful
- (Really not a priority) Convert to Typescript
- (Not priority) Add proper error handling for the application
- Validate user input data (express-validator)
- Implement testing (unit testing? integration testing?)
