document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown");
  const button = document.querySelector(".dropdown-btn");

  // Открытие и закрытие меню
  button.addEventListener("click", () => {
      dropdown.classList.toggle("open");
  });

  // Закрытие меню при клике вне
  document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target) && !event.target.matches(".dropdown-btn")) {
          dropdown.classList.remove("open");
      }
  });

  // Изменение текста кнопки при выборе цвета
  document.querySelectorAll(".dropdown-item input[type='radio']").forEach((input) => {
      input.addEventListener("change", () => {
          const selectedLabel = input.nextElementSibling.innerText;
          button.innerText = `Цвет: ${selectedLabel}`;
      });
  });
});

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

