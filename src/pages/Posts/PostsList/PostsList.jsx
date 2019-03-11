import React from 'react';
import { Link } from 'react-router-dom';

import image from '../../../assets/images/Post.jpg';

const PostsList = ({ posts }) => {
  return posts.map(post => {
    const { title, body } = post;
    return (
      <div key={title} className="card shadow my-4">
        <img className="card-img-top" src={image} alt="post" />
        <div className="card-body">
          <h3 className="card-title">
            <Link to={'/posts/' + title} className="card-link">
              {title}
            </Link>
          </h3>
          <p className="card-text">{body}</p>
          <p className="card-text">
            <small className="text-muted">Posted 3 mins ago</small>
          </p>
          {/*<Link to={'/users/' + this.getAuthor(post.userId)}>*/}
            {/*by {this.getAuthor(post.userId)}*/}
          {/*</Link>*/}

            <div>
              <button
                className="btn btn-outline-danger btn-sm float-right ml-4"
                //onClick={() => deletePost(post.id)}
              >
                Delete
              </button>
              < button
                className="btn btn-outline-info btn-sm float-right"
                //onClick={() => this.handlePostUpdateBtn(post)}
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