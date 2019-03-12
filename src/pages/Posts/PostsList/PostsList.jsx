import React from 'react';
import { Link } from 'react-router-dom';

import image from '../../../assets/images/Post.jpg';

const PostsList = ({ posts, onPostEdit }) => {
  return posts.map(item => {
    // destructuring posts list items
    const [id, post] = item;
    const { title, body, created_at } = post;
    return (
      <div key={id} className="card shadow my-4">
        <img className="card-img-top" src={image} alt="post" />
        <div className="card-body">
          <h3 className="card-title">
            <Link to={'/posts/' + title} className="card-link">
              {title}
            </Link>
          </h3>
          <p className="card-text">{body}</p>
          <p className="card-text">
            <small className="text-muted">{created_at}</small>
          </p>
          {/*<Link to={'/users/' + this.getAuthor(post.userId)}>*/}
            {/*by {this.getAuthor(post.userId)}*/}
          {/*</Link>*/}

            <div>
              <button
                className="btn btn-outline-danger float-right ml-4"
                //onClick={() => deletePost(post.id)}
              >
                Delete
              </button>
              < button
                className="btn btn-outline-info float-right"
                onClick={() => onPostEdit(id, post)}
              >
                Edit
              </button>
            </div>

        </div>
      </div>
    )
  })
};

export default PostsList;