import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { PostResponse } from '../../../interfaces/api-responses';
import { useSelector } from 'react-redux';
import { selectPostsList } from '../../../store/selectors/posts';


const LastPostsList: FC = () => {
  const postsList = useSelector(selectPostsList);

  const renderPost = (postInfo: PostResponse) => {
    const id = postInfo[0];
    const { title, created_at } = postInfo[1];
    return (
      <li className="list-group-item" key={id}>
        <Link to={'/posts/' + title} className="card-link">
          {title}
        </Link>
        <p className="card-text">
          <small className="text-muted">{created_at}</small>
        </p>
      </li>
    );
  }

  return (
    <div className="card my-4">
      <div className="card-header text-info">Last posts</div>
      <ul className="list-group list-group-flush">
        {postsList.map((item: PostResponse) => renderPost(item))}
      </ul>
    </div>
  );
};

export default LastPostsList;
