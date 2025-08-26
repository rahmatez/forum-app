import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { asyncReceiveLeaderboards } from "../states/leaderboards/action";
import Loading from "../components/Loading";
import "./LeaderboardsPage.css";

function LeaderboardsPage() {
  const { leaderboards = [], isLoading } = useSelector(
    (states) => states.leaderboards || { leaderboards: [], isLoading: true }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="leaderboards-page">
      <div className="container">
        <div className="page-header">
          <h1>Leaderboard</h1>
          <p>Pengguna dengan skor tertinggi</p>
        </div>

        <div className="leaderboards-container">
          {!leaderboards || leaderboards.length === 0 ? (
            <p className="no-data">Belum ada data leaderboard.</p>
          ) : (
            <div className="leaderboards-list">
              {leaderboards.map((leaderboard, index) => (
                <div key={leaderboard.user.id} className="leaderboard-item">
                  <div className="rank">
                    <span
                      className={`rank-number ${
                        index < 3 ? `top-${index + 1}` : ""
                      }`}>
                      {index + 1}
                    </span>
                  </div>

                  <div className="user-info">
                    <img
                      src={leaderboard.user.avatar}
                      alt={leaderboard.user.name}
                      className="user-avatar"
                    />
                    <div className="user-details">
                      <h3 className="user-name">{leaderboard.user.name}</h3>
                      <p className="user-email">{leaderboard.user.email}</p>
                    </div>
                  </div>

                  <div className="score">
                    <span className="score-value">{leaderboard.score}</span>
                    <span className="score-label">poin</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardsPage;
