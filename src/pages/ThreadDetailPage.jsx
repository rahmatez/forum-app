import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  clearThreadDetailActionCreator,
} from "../states/threadDetail/action";
import { showFormattedDate } from "../utils";
import Loading from "../components/Loading";
import "./ThreadDetailPage.css";

function ThreadDetailPage() {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { threadDetail, isLoading } = useSelector(
    (states) => states.threadDetail
  );
  const { authUser } = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(asyncReceiveThreadDetail(id));
    }

    return () => {
      dispatch(clearThreadDetailActionCreator());
    };
  }, [id, dispatch]);

  const onAddComment = (event) => {
    event.preventDefault();
    if (comment.trim()) {
      dispatch(asyncAddComment({ threadId: id, content: comment }));
      setComment("");
    }
  };

  const onUpVoteThread = () => {
    if (authUser) {
      dispatch(asyncToggleUpVoteThreadDetail(id));
    }
  };

  const onDownVoteThread = () => {
    if (authUser) {
      dispatch(asyncToggleDownVoteThreadDetail(id));
    }
  };

  const onUpVoteComment = (commentId) => {
    if (authUser) {
      dispatch(asyncToggleUpVoteComment({ threadId: id, commentId }));
    }
  };

  const onDownVoteComment = (commentId) => {
    if (authUser) {
      dispatch(asyncToggleDownVoteComment({ threadId: id, commentId }));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!threadDetail) {
    return (
      <div className="thread-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Thread tidak ditemukan</h2>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-back">
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isThreadUpVoted = authUser
    ? threadDetail.upVotesBy.includes(authUser.id)
    : false;
  const isThreadDownVoted = authUser
    ? threadDetail.downVotesBy.includes(authUser.id)
    : false;

  return (
    <div className="thread-detail-page">
      <div className="container">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn-back">
          ← Kembali
        </button>

        <div className="thread-detail">
          <div className="thread-header">
            <div className="thread-category">
              <span className="category-badge">{threadDetail.category}</span>
            </div>
            <h1 className="thread-title">{threadDetail.title}</h1>
            <div className="thread-meta">
              <div className="thread-owner">
                <img
                  src={threadDetail.owner.avatar}
                  alt={threadDetail.owner.name}
                  className="owner-avatar"
                />
                <div className="owner-info">
                  <span className="owner-name">{threadDetail.owner.name}</span>
                  <span className="thread-date">
                    {showFormattedDate(threadDetail.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="thread-content">
            <div className="thread-body">
              {threadDetail.body.replace(/<[^>]*>/g, "")}
            </div>
          </div>

          <div className="thread-actions">
            <div className="vote-section">
              <button
                type="button"
                className={`vote-btn ${isThreadUpVoted ? "voted" : ""}`}
                onClick={onUpVoteThread}
                disabled={!authUser}>
                ↑ {threadDetail.upVotesBy?.length || 0}
              </button>
              <button
                type="button"
                className={`vote-btn ${isThreadDownVoted ? "voted" : ""}`}
                onClick={onDownVoteThread}
                disabled={!authUser}>
                ↓ {threadDetail.downVotesBy?.length || 0}
              </button>
            </div>
          </div>
        </div>

        <div className="comments-section">
          <h3>Komentar ({threadDetail.comments?.length || 0})</h3>

          {authUser ? (
            <form onSubmit={onAddComment} className="comment-form">
              <div className="form-group">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tulis komentar Anda..."
                  rows={4}
                  required
                />
              </div>
              <button type="submit" className="btn-comment">
                Kirim Komentar
              </button>
            </form>
          ) : (
            <div className="login-prompt">
              <p>Silakan login untuk menambahkan komentar</p>
            </div>
          )}

          <div className="comments-list">
            {!threadDetail.comments || threadDetail.comments.length === 0 ? (
              <p className="no-comments">Belum ada komentar.</p>
            ) : (
              threadDetail.comments.map((commentItem) => {
                const isCommentUpVoted =
                  authUser && commentItem.upVotesBy
                    ? commentItem.upVotesBy.includes(authUser.id)
                    : false;
                const isCommentDownVoted =
                  authUser && commentItem.downVotesBy
                    ? commentItem.downVotesBy.includes(authUser.id)
                    : false;

                return (
                  <div key={commentItem.id} className="comment-item">
                    <div className="comment-header">
                      <div className="comment-owner">
                        <img
                          src={commentItem.owner.avatar}
                          alt={commentItem.owner.name}
                          className="owner-avatar"
                        />
                        <div className="owner-info">
                          <span className="owner-name">
                            {commentItem.owner.name}
                          </span>
                          <span className="comment-date">
                            {showFormattedDate(commentItem.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="comment-content">
                      <div className="comment-body">
                        {commentItem.content.replace(/<[^>]*>/g, "")}
                      </div>
                    </div>{" "}
                    <div className="comment-actions">
                      <div className="vote-section">
                        <button
                          type="button"
                          className={`vote-btn ${
                            isCommentUpVoted ? "voted" : ""
                          }`}
                          onClick={() => onUpVoteComment(commentItem.id)}
                          disabled={!authUser}>
                          ↑ {commentItem.upVotesBy?.length || 0}
                        </button>
                        <button
                          type="button"
                          className={`vote-btn ${
                            isCommentDownVoted ? "voted" : ""
                          }`}
                          onClick={() => onDownVoteComment(commentItem.id)}
                          disabled={!authUser}>
                          ↓ {commentItem.downVotesBy?.length || 0}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadDetailPage;
