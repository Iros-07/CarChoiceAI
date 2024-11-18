// тема светлая темная 
const themeToggleButton = document.getElementById('theme-toggle');
const themeStylesheet = document.getElementById('theme-stylesheet');

themeToggleButton.addEventListener('click', function() {
  if (themeStylesheet.getAttribute('href') === 'light-theme.css') {
    themeStylesheet.setAttribute('href', 'dark-theme.css');
  } else {
    themeStylesheet.setAttribute('href', 'light-theme.css');
  }
});
