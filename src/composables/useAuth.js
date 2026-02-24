import { ref } from 'vue';

const userName = ref(localStorage.getItem('userName') || '');
const token = ref(localStorage.getItem('token') || '');

export const useAuth = () => {
  const setAuth = (newToken, newName) => {
    token.value = newToken;
    userName.value = newName;
    localStorage.setItem('token', newToken);
    localStorage.setItem('userName', newName);
  };

  const clearAuth = () => {
    token.value = '';
    userName.value = '';
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  };

  return { userName, token, setAuth, clearAuth };
};
