import { isExpired } from 'react-jwt';

export const checkAuth = () => {
  const token = sessionStorage.getItem('auth');
  console.log('TOKEN: ', token);
  if (token !== null) {
    return !isExpired(token);
  }

  return false;
};
