import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncUnsetAuthUser } from "../states/authUser/action";
import "./Navigation.css";

function Navigation() {
  const { authUser } = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate("/");
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <h2>Forum Diskusi</h2>
        </Link>

        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/leaderboards" className="nav-link">
            Leaderboard
          </Link>

          {authUser ? (
            <div className="nav-user">
              <Link to="/new-thread" className="nav-link btn-create">
                Buat Thread
              </Link>
              <div className="user-info">
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  className="user-avatar"
                />
                <span className="user-name">{authUser.name}</span>
                <button type="button" onClick={onLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link btn-register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
