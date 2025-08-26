import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import ThreadsList from "../components/ThreadsList";
import Loading from "../components/Loading";
import "./HomePage.css";

function HomePage() {
  const {
    threads = { threads: [], isLoading: false },
    users = { users: [], isLoading: false },
  } = useSelector((states) => states);

  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  if (threads.isLoading || users.isLoading) {
    return <Loading />;
  }

  // Get unique categories
  const categories = [
    ...new Set(threads.threads.map((thread) => thread.category)),
  ];

  // Filter threads by category
  const filteredThreads = selectedCategory
    ? threads.threads.filter((thread) => thread.category === selectedCategory)
    : threads.threads;

  return (
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h1>Diskusi Terkini</h1>
          <p>Jelajahi berbagai topik diskusi yang menarik</p>
        </div>

        {categories && categories.length > 0 && (
          <div className="category-filter">
            <h3>Filter Kategori:</h3>
            <div className="category-buttons">
              <button
                type="button"
                className={`category-btn ${
                  selectedCategory === "" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("")}>
                Semua
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`category-btn ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}>
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="threads-section">
          <ThreadsList threads={filteredThreads} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
