import api from "./client";

export const authAPI = {
  register: (email, password) =>
    api.post("/auth/register", { email, password }),

  login: (email, password) => api.post("/auth/login", { email, password }),
};

export const codeAPI = {
  // Submit code for execution + AI analysis
  submit: (code, language = "python") =>
    api.post("/code/submit", { code, language }),

  // Fetch last 10 submissions
  history: () => api.get("/code/history"),
};
