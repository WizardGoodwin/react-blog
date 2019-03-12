import React from 'react';

const PostForm = ({
  form,
  isNewPost,
  onPostChange,
  setModalOpen,
  onSubmit,
}) => {
  const { title, body } = form;
  return (
    <div className="card">
      <div className="card-header">
        {isNewPost ? 'Add new Post' : 'Edit post'}
        <button className="close" onClick={() => setModalOpen(false)}>
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
              defaultValue={title}
              onChange={(e) => onPostChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Post body: </label>
            <textarea
              className="form-control"
              id="body"
              rows="5"
              defaultValue={body}
              onChange={(e) => onPostChange(e)}
            />
          </div>

          <button className="btn btn-success" type="submit">
            Save
          </button>

          <button
            className="btn btn-secondary float-right"
            onClick={() => setModalOpen(false)}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
