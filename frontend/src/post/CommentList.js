import NewCommentForm from './NewCommentForm';
import { useEffect } from 'react';
import apiPost from './api-post';
import { isAuthenticated } from '../auth/auth-helper';
import Comment from './Comment';
const CommentList = ({
  userId,
  userName,
  comments,
  setComments = (f) => f,
  postId,
}) => {
  const addComment = (text) => {
    const jwt = isAuthenticated();
    if (jwt)
      apiPost.createComment(jwt.user._id, postId, jwt, text).then((data) => {
        setComments(data.comments);
      });
  };
  const onDelete = (id) => {
    const jwt = isAuthenticated();
    if (jwt)
      apiPost
        .deleteCommentById(jwt.user._id, postId, id, jwt)
        .then((data) => setComments(data.comments));
  };
  return (
    <>
      <NewCommentForm addComment={addComment} />
      {comments &&
        comments.map((c) => (
          <Comment
            key={c._id}
            userId={isAuthenticated().user._id}
            userName={isAuthenticated().user.name}
            comment={c}
            onDelete={onDelete}
          />
        ))}
    </>
  );
};
export default CommentList;
