import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import image from '../../assets/images/Post.jpg';
import { IPost } from '../../interfaces/post.interface';
import { PostResponse } from '../../interfaces/api-responses';


interface IProps {
  username: string | null;
  posts: PostResponse[];
  onPostEdit(id: string, post: IPost): void;
  onPostDelete(id: string): void;
}

const PostsList: FC<IProps> = ({ username, posts, onPostEdit, onPostDelete }) => {
  return (
    <div>
      {posts.map((item: PostResponse) => {
        const [id, post] = item;
        const { title, body, created_at, author } = post;
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
              <Link to={`/users/${author}`}>by {author}</Link>

              {username === author && (
                // if current user is author, then he can edit and delete post
                <div>
                  <button
                    className="btn btn-outline-danger float-right ml-4"
                    onClick={() => onPostDelete(id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-outline-info float-right"
                    onClick={() => onPostEdit(id, post)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  )
};

export default PostsList;
