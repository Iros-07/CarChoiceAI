

// Логика вкладок
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Убираем активный класс с всех вкладок и панелей
    tabs.forEach(tab => tab.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    // Добавляем активный класс к текущей вкладке и панели
    tab.classList.add('active');
    const activeTabPanel = document.getElementById(tab.dataset.tab);
    activeTabPanel.classList.add('active');

    // Прокручиваем страницу к выбранной панели
    activeTabPanel.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Кнопки
  const findCarButton = document.querySelector(".find-car-btn");
  const resetButton = document.querySelector(".reset-btn");
  const resultContainer = document.getElementById("result");

  // Поля формы
  const fields = {
    brand: document.getElementById("car-brand"),
    yearFrom: document.getElementById("year-from"),
    yearTo: document.getElementById("year-to"),
    priceFrom: document.getElementById("price-from"),
    priceTo: document.getElementById("price-to"),
    gearbox: document.getElementById("car-gearbox"),
    body: document.getElementById("car-body"),
    fuel: document.getElementById("car-fuel"),
    engineFrom: document.getElementById("engine-from"),
    engineTo: document.getElementById("engine-to"),
    steering: document.getElementById("car-wheel"),
    drivetrain: document.getElementById("car-drive"),
    color: document.getElementById("car-color"),
  };

  // Функция отображения блока с результатом
function showResult(message, type = "success") {
  // Если результат уже существует, скрываем его с анимацией перед созданием нового
  if (resultContainer.classList.contains("active")) {
    hideResult();
  }

  // Устанавливаем текст и класс в зависимости от типа
  resultContainer.textContent = message;
  resultContainer.className = "result"; // Сбрасываем классы
  resultContainer.classList.add(type === "error" ? "error" : "success", "active");

  // Плавное появление нового текста
  resultContainer.style.visibility = "visible";
  resultContainer.style.opacity = "1";

  // Через 8 секунд скрываем блок с результатом
  setTimeout(() => {
    hideResult();
  }, 8000); // Время отображения текста
}

// Функция скрытия блока результата

function hideResult() {
  resultContainer.classList.add("fade-out");
  setTimeout(() => {
    resultContainer.classList.remove("active", "fade-out");
    resultContainer.style.visibility = "hidden"; // Скрываем текст
    resultContainer.style.opacity = "0"; // Убираем прозрачность
  }, 1000); // Время для анимации исчезновения
}

  // Проверка заполнения полей
  function validateForm() {
    let isValid = false;

    for (let key in fields) {
      const field = fields[key];
      if (field && field.value.trim() !== "") {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      showResult("Ошибка: выберите хотя бы один параметр!", "error");
    }

    return isValid;
  }

  // Найти машину
  function findCar() {
    if (!validateForm()) return;

    const selectedOptions = {};
    for (let key in fields) {
      const field = fields[key];
      if (field && field.value.trim() !== "") {
        selectedOptions[key] = field.value;
      }
    }

    showResult(
      `Вы подобрали параметры:\n${JSON.stringify(selectedOptions, null, 2)}`
    );
  }

  // Сбросить форму
  function resetForm() {
    for (let key in fields) {
      const field = fields[key];
      if (field) {
        field.value = "";
      }
    }

    showResult("Выбор параметров сброшен.");
  }

  // Установка ограничений для года и объёма двигателя
  const currentYear = new Date().getFullYear();
  if (fields.yearFrom) {
    fields.yearFrom.min = 1900;
    fields.yearFrom.max = currentYear;
  }
  if (fields.yearTo) {
    fields.yearTo.min = 1900;
    fields.yearTo.max = currentYear;
  }
  if (fields.engineFrom) {
    fields.engineFrom.min = 0.1;
    fields.engineFrom.max = 9.9;
    fields.engineFrom.step = 0.1;
  }
  if (fields.engineTo) {
    fields.engineTo.min = 0.1;
    fields.engineTo.max = 9.9;
    fields.engineTo.step = 0.1;
  }

  // Привязка событий к кнопкам
  findCarButton.addEventListener("click", findCar);
  resetButton.addEventListener("click", resetForm);
});
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Устанавливаем сохранённую тему при загрузке
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️"; // Иконка для светлой темы
  } else {
    body.classList.add("light"); // Добавляем светлую тему, если сохранено значение
    themeToggle.textContent = "🌙"; // Иконка для темной темы
  }

  // Переключение темы
  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});



document.getElementById('scroll-left').addEventListener('click', function() {
  document.querySelector('.tab-list').scrollBy({
    left: -200,  // Прокручиваем на 200px влево
    behavior: 'smooth'
  });
});

document.getElementById('scroll-right').addEventListener('click', function() {
  document.querySelector('.tab-list').scrollBy({
    left: 200,  // Прокручиваем на 200px вправо
    behavior: 'smooth'
  });
});
