// SET STORAGE
const setLanguage = (language: any) => {
  localStorage.setItem('language', JSON.stringify(language));
};

const setTokens = (tokens: any) => {
  localStorage.setItem('tokens', JSON.stringify(tokens));
};

const setUserData = (userData: any) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

// GET FROM STORAGE
const getLanguage = () =>
  JSON.parse(localStorage.getItem('language') || '{"":""}');

const getTokens = () => JSON.parse(localStorage.getItem('tokens') || '{"":""}');

const getUserData = () => {
  const item = localStorage.getItem('userData');

  try {
    return JSON.parse(item || '{"":""}');
  } catch (error) {
    localStorage.removeItem('userData');
    return '{"":""}';
  }
};
// Remove items from storage
export const removeItemFromStorage = (key: any) => localStorage.removeItem(key);

export {
  setLanguage,
  getLanguage,
  setTokens,
  getTokens,
  setUserData,
  getUserData,
};
