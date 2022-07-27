// SET STORAGE
const setLanguage = (language: any) => {
  localStorage.setItem('language', JSON.stringify(language));
};

const setTokens = (tokens: {}) => {
  localStorage.setItem('tokens', JSON.stringify(tokens));
};

// GET FROM STORAGE
const getLanguage = () =>
  JSON.parse(localStorage.getItem('language') || '{"":""}');

const getTokens = () =>
  JSON.parse(localStorage.getItem('language') || '{"":""}');

// Remove items from storage
export const removeItemFromStorage = (key: any) => localStorage.removeItem(key);

export { setLanguage, getLanguage, setTokens, getTokens };
