import React from "react";
import PropTypes from "prop-types";
import ThreadItem from "./ThreadItem";

function ThreadsList({ threads = [] }) {
  return (
    <div className="threads-list">
      {!threads || threads.length === 0 ? (
        <p className="no-threads">Belum ada thread yang tersedia.</p>
      ) : (
        threads.map((thread) => <ThreadItem key={thread.id} thread={thread} />)
      )}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ThreadsList;
