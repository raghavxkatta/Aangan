export const getThemeFromLocalStorage = () => {
    return localStorage.getItem('theme') || 'light';
  };
  
  export const setThemeInLocalStorage = (theme) => {
    localStorage.setItem('theme', theme);
  };
  