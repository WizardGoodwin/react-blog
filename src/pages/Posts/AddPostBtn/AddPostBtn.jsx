import React from 'react';

const AddPostBtn = ({ onAddPost }) => {
  return (
    <div className="mt-4">
      <button className="btn btn-info" onClick={() => onAddPost()}>
        Add new post
      </button>
    </div>
  );
};

export default AddPostBtn;
