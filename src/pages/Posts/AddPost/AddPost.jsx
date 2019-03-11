import React from 'react';

const AddPost = ({ setModalOpen }) => {
  return (
    <div className="mt-4">
      <button
        className="btn btn-info"
        onClick={() => setModalOpen(true)}
      >
        Add new post
      </button>
    </div>
  )
};

export default AddPost;