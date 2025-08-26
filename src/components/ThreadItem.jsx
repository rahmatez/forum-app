import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
} from "../states/threads/action";
import { postedAt, truncateText } from "../utils";
import "./ThreadItem.css";

function ThreadItem({ thread }) {
  const { authUser } = useSelector((states) => states.authUser);
  const { users } = useSelector((states) => states.users);
  const dispatch = useDispatch();

  const threadOwner = users?.find((user) => user && user.id === thread.ownerId);

  const isUpVoted =
    authUser && thread.upVotesBy
      ? thread.upVotesBy.includes(authUser.id)
      : false;
  const isDownVoted =
    authUser && thread.downVotesBy
      ? thread.downVotesBy.includes(authUser.id)
      : false;

  const onUpVote = () => {
    if (authUser) {
      dispatch(asyncToggleUpVoteThread(thread.id));
    }
  };

  const onDownVote = () => {
    if (authUser) {
      dispatch(asyncToggleDownVoteThread(thread.id));
    }
  };

  return (
    <div className="thread-item">
      <div className="thread-header">
        <div className="thread-category">
          <span className="category-badge">{thread.category}</span>
        </div>
        <div className="thread-meta">
          <span className="thread-date">{postedAt(thread.createdAt)}</span>
        </div>
      </div>

      <div className="thread-content">
        <Link to={`/threads/${thread.id}`} className="thread-title-link">
          <h3 className="thread-title">{thread.title}</h3>
        </Link>
        <p className="thread-body">
          {truncateText(thread.body.replace(/<[^>]*>/g, ""), 150)}
        </p>
      </div>

      <div className="thread-footer">
        <div className="thread-owner">
          {threadOwner && (
            <>
              <img
                src={threadOwner.avatar}
                alt={threadOwner.name}
                className="owner-avatar"
              />
              <span className="owner-name">{threadOwner.name}</span>
            </>
          )}
        </div>

        <div className="thread-stats">
          <div className="vote-section">
            <button
              type="button"
              className={`vote-btn ${isUpVoted ? "voted" : ""}`}
              onClick={onUpVote}
              disabled={!authUser}>
              ↑ {thread.upVotesBy?.length || 0}
            </button>
            <button
              type="button"
              className={`vote-btn ${isDownVoted ? "voted" : ""}`}
              onClick={onDownVote}
              disabled={!authUser}>
              ↓ {thread.downVotesBy?.length || 0}
            </button>
          </div>

          <div className="comment-count">
            <span>💬 {thread.totalComments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
};

export default ThreadItem;
