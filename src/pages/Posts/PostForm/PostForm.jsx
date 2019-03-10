import React from 'react';

import Spinner from '../../../shared/Spinner/Spinner';

const PostForm = ({ form, onPostChange, setModalOpen, onSubmit, userUpdating }) => {
  return (
    <div className="card">
      <div className="card-header">
        Add new Post
        <button
          className="close"
          onClick={() => setModalOpen(false)}
        >
          <span>&times;</span>
        </button>
      </div>
      <div className="card-body">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="title">Post title: </label>
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={(e) => onPostChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Post body: </label>
            <textarea
              className="form-control"
              id="body"
              rows="5"
              onChange={(e) => onPostChange(e)}
            />
          </div>
          {userUpdating ? (
            <Spinner />
          ) : (
            <button className="btn btn-success" type="submit">
              Save
            </button>
          )}
          <button
            className="btn btn-secondary float-right"
            onClick={() => setModalOpen(false)}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  )
};

export default PostForm;