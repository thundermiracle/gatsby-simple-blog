/* eslint-disable no-empty */
export default function themeOper() {
  const onThemeChangeFuncObj = {};
  let preferredTheme;

  function setTheme(newTheme) {
    window.__theme = newTheme;
    preferredTheme = newTheme;
    document.body.className = newTheme;
    Object.values(onThemeChangeFuncObj).forEach(func => func(newTheme));
  }

  try {
    preferredTheme = localStorage.getItem('theme');
  } catch (err) {}

  window.__setPreferredTheme = function(newTheme) {
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (err) {}
  };

  window.__subOnThemeChange = function(key, func) {
    onThemeChangeFuncObj[key] = func;
  };

  window.__unsubOnThemeChange = function(key) {
    Reflect.deleteProperty(onThemeChangeFuncObj, key);
  };

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkQuery.addListener(function(e) {
    window.__setPreferredTheme(e.matches ? 'dark' : 'light');
  });

  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
}
