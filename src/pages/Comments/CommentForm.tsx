import React, { ChangeEvent, FormEvent, FC } from 'react';


interface IProps {
  form: ICommentForm;
  postId: string;
  onCommentChange(e: ChangeEvent): void;
  onSubmit(e: FormEvent, postId: string): void;
}

interface ICommentForm {
  commentTitle: string;
  commentBody: string;
}

const CommentForm: FC<IProps> = ({ form, postId, onCommentChange, onSubmit }) => {
  const { commentTitle, commentBody } = form;
  return (
    <form className="mb-5" onSubmit={(e) => onSubmit(e, postId)}>
      <h4 className="mb-4">Add comment:</h4>
      <div className="form-group">
        <label htmlFor="commentTitle">Title:</label>
        <input
          type="text"
          className="form-control"
          id="commentTitle"
          placeholder="Enter title"
          value={commentTitle}
          onChange={(e) => onCommentChange(e)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="commentBody">Your comment:</label>
        <textarea
          className="form-control"
          id="commentBody"
          placeholder="Enter your comment"
          rows={3}
          value={commentBody}
          onChange={(e) => onCommentChange(e)}
        />
      </div>
      <button className="btn btn-success" type="submit">
        Send
      </button>
    </form>
  );
};

export default CommentForm;
