import React from 'react';
import { Link } from 'react-router-dom';

import image from '../../../assets/images/Post.jpg';

const Post = ({ post }) => {
  const { title, body } = post;
  return (
    <div className="card shadow my-4">
      <img className="card-img-top" src={image} alt="post" />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{body}</p>
        <p className="card-text">
          <small className="text-muted">Posted 3 mins ago</small>
        </p>
        {/*<Link to={'/users/' + author.username}>*/}
          {/*by {author.username}*/}
        {/*</Link>*/}
      </div>
      <div className="card-footer">
        <Link to={'/posts'} className="card-link">Go to posts list</Link>
      </div>
    </div>
  )
};

export default Post;