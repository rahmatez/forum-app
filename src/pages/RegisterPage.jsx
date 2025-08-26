import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncRegisterUser } from "../states/authUser/action";
import useNotification from "../utils/hooks";
import "./RegisterPage.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { notification, showNotification } = useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((states) => states.authUser);

  const onRegister = async (event) => {
    event.preventDefault();

    try {
      const success = await dispatch(asyncRegisterUser({ name, email, password }));
      if (success) {
        showNotification("Registrasi berhasil! Silakan login.", "success");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      // Error handled by Redux
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <h2>Daftar ke Forum</h2>

          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={onRegister} className="register-form">
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                required
              />
            </div>

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
                placeholder="Masukkan password (min. 6 karakter)"
                minLength={6}
                required
              />
            </div>

            <button type="submit" className="btn-register" disabled={isLoading}>
              {isLoading ? "Mendaftar..." : "Daftar"}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Sudah punya akun? <Link to="/login">Masuk di sini</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
