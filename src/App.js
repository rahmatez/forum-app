import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncPreloadProcess } from "./states/authUser/action";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewThreadPage from "./pages/NewThreadPage";
import ThreadDetailPage from "./pages/ThreadDetailPage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const { authUser } = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const [isPreloadComplete, setIsPreloadComplete] = React.useState(false);

  useEffect(() => {
    dispatch(asyncPreloadProcess()).finally(() => {
      setIsPreloadComplete(true);
    });
  }, [dispatch]);

  if (!isPreloadComplete) {
    return <Loading />;
  }

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/threads/:id" element={<ThreadDetailPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          {authUser && <Route path="/new-thread" element={<NewThreadPage />} />}
        </Routes>
      </main>
    </div>
  );
}

export default App;
