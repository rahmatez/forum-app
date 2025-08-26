import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddThread } from "../states/threads/action";
import "./NewThreadPage.css";

function NewThreadPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const { isLoading } = useSelector((states) => states.threads);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(asyncAddThread({ title, body, category }));
      navigate("/");
    } catch (error) {
      // Error will be handled by reducer
    }
  };

  return (
    <div className="new-thread-page">
      <div className="container">
        <div className="page-header">
          <h1>Buat Thread Baru</h1>
          <p>Mulai diskusi baru dengan komunitas</p>
        </div>

        <div className="thread-form-container">
          <form onSubmit={onSubmit} className="thread-form">
            <div className="form-group">
              <label htmlFor="title">Judul Thread</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul thread yang menarik"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Kategori</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Masukkan kategori (opsional)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="body">Konten Thread</label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tulis konten thread Anda di sini..."
                rows={10}
                required
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn-cancel">
                Batal
              </button>
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? "Membuat..." : "Buat Thread"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewThreadPage;
