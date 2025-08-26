import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetAuthUser } from "../states/authUser/action";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error } = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(asyncSetAuthUser({ email, password }));
      navigate("/");
    } catch (err) {
      // Error will be handled by reducer
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h2>Masuk ke Forum</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={onLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
                required
              />
            </div>

            <button type="submit" className="btn-login" disabled={isLoading}>
              {isLoading ? "Masuk..." : "Masuk"}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Belum punya akun? <Link to="/register">Daftar di sini</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
