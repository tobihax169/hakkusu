import { ref } from 'vue';

const userName = ref(localStorage.getItem('userName') || '');
const token = ref(localStorage.getItem('token') || '');
const role = ref(localStorage.getItem('userRole') || 'user');

export const useAuth = () => {
  const setAuth = (newToken, newName, newRole = 'user') => {
    token.value = newToken;
    userName.value = newName;
    role.value = newRole;
    localStorage.setItem('token', newToken);
    localStorage.setItem('userName', newName);
    localStorage.setItem('userRole', newRole);
  };

  const clearAuth = () => {
    token.value = '';
    userName.value = '';
    role.value = 'user';
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  };

  return { userName, token, role, setAuth, clearAuth };
};
