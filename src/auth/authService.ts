export const getCurrentUser = () => {
  return localStorage.getItem('token');
};
