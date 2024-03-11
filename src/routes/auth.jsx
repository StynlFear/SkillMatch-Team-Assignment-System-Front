export const setToken = (accessToken, refreshToken) => {
    // Store tokens in local storage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };