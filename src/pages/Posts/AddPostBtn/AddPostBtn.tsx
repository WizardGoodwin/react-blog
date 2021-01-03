import React, { FC } from 'react';

interface IProps {
  onAddPost(): any;
}

const AddPostBtn: FC<IProps> = ({ onAddPost }) => {
  return (
    <div className="mt-4">
      <button className="btn btn-info" onClick={() => onAddPost()}>
        Add new post
      </button>
    </div>
  );
};

export default AddPostBtn;
