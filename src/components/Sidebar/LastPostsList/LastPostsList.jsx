import React from 'react';
import { Link } from 'react-router-dom';


const LastPostsList = ({ postsList }) => {

  const getLastPosts = () => {
    return postsList.map(item => {
      const id = item[0];
      const { title, created_at } = item[1];
      return (
        <li className="list-group-item" key={id}>
        <Link to={'/posts/' + title} className="card-link">
          {title}
        </Link>
        <p className="card-text">
          <small className="text-muted">{created_at}</small>
        </p>
      </li>
      )
    })
  };

  return (
    <div className="card mt-4">
      <div className="card-header text-info">Last posts</div>
      <ul className="list-group list-group-flush" >
        { getLastPosts() }
      </ul>
    </div>
  );
};

export default LastPostsList;
