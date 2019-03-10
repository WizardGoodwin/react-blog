import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import PostForm from '../pages/Posts/PostForm/PostForm';
import ErrorIndicator from '../shared/ErrorIndicator/ErrorIndicator';
import { addPost } from '../store/actions/posts';

Modal.setAppElement('#root');

const PostsContainer = ({ error, userUpdating, addPost }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [form, setValues] = useState({title: '', body: ''});

  const onPostChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...form,
      [id]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPost(form);
    setModalOpen(false);
  };

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <Fragment>
      <div className="mt-4">
        <button
          className="btn btn-info"
          onClick={() => setModalOpen(true)}
        >
          Add new post
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="modal-post"
        overlayClassName="overlay"
        shouldCloseOnOverlayClick={true}
        closeTimeoutMS={300}
      >
        <PostForm
          form={form}
          onPostChange={onPostChange}
          setModalOpen={setModalOpen}
          onSubmit={onSubmit}
        />
      </Modal>
    </Fragment>
  )
};

const mapStateToProps = ({ posts: { error, postUpdating }}) => {
  return { error, postUpdating };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => dispatch(addPost(post)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsContainer);
