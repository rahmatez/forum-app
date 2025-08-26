const API_BASE_URL = "https://forum-api.dicoding.dev/v1";

function getToken() {
  return localStorage.getItem("token");
}

function putToken(token) {
  localStorage.setItem("token", token);
}

function deleteToken() {
  localStorage.removeItem("token");
}

async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(responseJson.message || "Something went wrong");
  }

  return responseJson;
}

async function register({ name, email, password }) {
  const response = await fetchWithAuth("/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  return response.data.user;
}

async function login({ email, password }) {
  const response = await fetchWithAuth("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return response.data.token;
}

async function getOwnProfile() {
  const response = await fetchWithAuth("/users/me");
  return response.data.user;
}

async function getAllUsers() {
  const response = await fetchWithAuth("/users");
  return response.data.users;
}

async function getAllThreads() {
  const response = await fetchWithAuth("/threads");
  return response.data.threads;
}

async function createThread({ title, body, category = "" }) {
  const response = await fetchWithAuth("/threads", {
    method: "POST",
    body: JSON.stringify({ title, body, category }),
  });

  return response.data.thread;
}

async function getThreadDetail(threadId) {
  const response = await fetchWithAuth(`/threads/${threadId}`);
  return response.data.detailThread;
}

async function createComment({ threadId, content }) {
  const response = await fetchWithAuth(`/threads/${threadId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });

  return response.data.comment;
}

async function upVoteThread(threadId) {
  const response = await fetchWithAuth(`/threads/${threadId}/up-vote`, {
    method: "POST",
  });

  return response.data.vote;
}

async function downVoteThread(threadId) {
  const response = await fetchWithAuth(`/threads/${threadId}/down-vote`, {
    method: "POST",
  });

  return response.data.vote;
}

async function neutralizeThreadVote(threadId) {
  const response = await fetchWithAuth(`/threads/${threadId}/neutral-vote`, {
    method: "POST",
  });

  return response.data.vote;
}

async function upVoteComment({ threadId, commentId }) {
  const response = await fetchWithAuth(
    `/threads/${threadId}/comments/${commentId}/up-vote`,
    {
      method: "POST",
    }
  );

  return response.data.vote;
}

async function downVoteComment({ threadId, commentId }) {
  const response = await fetchWithAuth(
    `/threads/${threadId}/comments/${commentId}/down-vote`,
    {
      method: "POST",
    }
  );

  return response.data.vote;
}

async function neutralizeCommentVote({ threadId, commentId }) {
  const response = await fetchWithAuth(
    `/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {
      method: "POST",
    }
  );

  return response.data.vote;
}

async function getLeaderboards() {
  const response = await fetchWithAuth("/leaderboards");
  return response.data.leaderboards;
}

export {
  getToken,
  putToken,
  deleteToken,
  register,
  login,
  getOwnProfile,
  getAllUsers,
  getAllThreads,
  createThread,
  getThreadDetail,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralizeThreadVote,
  upVoteComment,
  downVoteComment,
  neutralizeCommentVote,
  getLeaderboards,
};
