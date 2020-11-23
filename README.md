# React blog

This is demo project, developed by me for demonstration purposes.
The goal of it's creating is a demonstration of my knowledge and skills for working with React and it's environment.

## Technologies and Libs

- React 17.x.x (including React Hooks)
- Redux - handling global app store
- Redux-thunk - handling store async requests
- Firebase -  imitation of backend, database, user authentication and for hosting
- Bootstrap - design appearance of app
- Formik и Yup - handling forms and validating forms


## Implemented functionality

- Users registration and authorization with authentication by token using Firebase;
- CRUD operations for some entities (posts, comments) by asynchronous requests to server with separation of access <br>
rights (some operations are available only for authenticated users);
- guarded routes (with redirecting if necessary).


## Description of the app
You can view the demo here [Demo](https://reactblog-d7743.firebaseapp.com)
Typescript version take place on separate branch [Typescript](https://github.com/WizardGoodwin/react-blog/tree/typescript)

### Unregistered user

Unregistered user can view posts list on page `/posts`, clicking on the post title he will go to the page of a <br>
separate post and can view comments list for that post. He can't add new posts or comments. When he tries to view <br> 
the list of registered users at `/users`, he will be redirected to the sign in page.

There are 5 registered users. For demonstration purposes, you can go under any of them or register new.

Sign in details. Email - one of:

- Sincere@april.biz;
- hanna@melissa.tv;
- Nathan@yesenia.net;
- Julianne.OConner@kory.org;
- Lucio_Hettinger@annie.ca;

Password: for all - `12345678`.

### Registered user can also:

- edit own profile at `/profile`;
- add new posts;
- edit and delete only own posts;
- add comments;
- put likes and dislikes to comments;
- view the list of registered users at `/users`. 


## Available Scripts

In the project directory, you can run:

### `yarn pretty`

Runs `Prettier` plugin and stylizes code according to rules in `.prettierrc` file.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

