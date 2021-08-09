import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addComment } from "../../actions/post";
import { connect } from "react-redux";

const CommentForm = ({ postId, addComment }) => {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        addComment(postId, {text});
        setText('');
    }

    return (
        <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form onSubmit={handleCommentSubmit} class="form my-1">
          <textarea
            value={text}
            onChange={handleTextChange}
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, {
    addComment
})(CommentForm);
