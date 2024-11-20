// Находим кнопку и body
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Добавляем обработчик клика на кнопку
toggleButton.addEventListener('click', () => {
  // Переключаем классы темы
  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  }
});
