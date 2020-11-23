import React, { FunctionComponent } from 'react';

const About: FunctionComponent = () => {
  return (
    <div className="card shadow-sm my-4">
      <div className="card-body">
        <h5 className="card-title">About blog</h5>
        <p className="card-text">
          This is demo project, developed by
          <a
            href="https://github.com/WizardGoodwin"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Maxim Patrushev{' '}
          </a>
          demonstration purposes.
        </p>
        <p>
          The goal of it's creating is a demonstration of my knowledge and
          skills for working with React and it's environment.
        </p>
        <h6>Implemented technologies and libs:</h6>
        <ul>
          <li>React 17.x.x (including React Hooks)</li>
          <li>Redux - handling global app store</li>
          <li>Redux-thunk - handling store async requests</li>
          <li>
            Firebase - imitation of backend, database, user authentication and
            for hosting
          </li>
          <li>Bootstrap - design appearance of app</li>
          <li>Formik и Yup - handling forms and validating forms</li>
        </ul>
        <h6>Implemented functionality:</h6>
        <ul>
          <li>
            - Users registration and authorization with authentication by token
            using Firebase;
          </li>
          <li>
            - CRUD operations for some entities (posts, comments) by
            asynchronous requests to server with separation of access rights
            (some operations are available only for authenticated users);
          </li>
          <li>- guarded routes (with redirecting if necessary).</li>
        </ul>
        <p>
          To get more information and to view source code please visit repo
          <a
            href="https://github.com/WizardGoodwin/react-blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            React Blog
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
