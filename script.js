document.addEventListener("DOMContentLoaded", function () {
  // Создание блока для результатов
  const resultContainer = document.createElement("div");
  resultContainer.id = "result";
  resultContainer.className = "result";

  const mainContainer = document.querySelector("#carForm");
  if (mainContainer) {
    mainContainer.insertAdjacentElement("afterend", resultContainer);
  }

  // Логика вкладок
  const tabs = document.querySelectorAll(".tab");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((tab) => tab.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));

      tab.classList.add("active");
      const activeTabPanel = document.getElementById(tab.dataset.tab);
      activeTabPanel.classList.add("active");

      activeTabPanel.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // Кнопки
  const findCarButton = document.querySelector(".find-car-btn");
  const resetButton = document.querySelector(".reset-btn");

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

  // Функция отображения результата
  function showResult(message, type = "success") {
    resultContainer.textContent = message;
    resultContainer.className = "result"; // Сбрасываем классы
    resultContainer.classList.add(type === "error" ? "error" : "success");
    resultContainer.style.display = "block";
  }

  // Скрытие результата
  function hideResult() {
    resultContainer.style.display = "none";
  }

  // Проверка заполнения формы
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

    showResult("Выбор параметров сброшен.", "success");
  }

  // Установка ограничений на ввод
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

  // Обработчики событий
  findCarButton.addEventListener("click", findCar);
  resetButton.addEventListener("click", resetForm);

  // Изначально скрываем результат
  hideResult();

  // Логика переключения темы
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    body.classList.add("light");
    themeToggle.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Прокрутка вкладок
  document.getElementById("scroll-left").addEventListener("click", function () {
    document.querySelector(".tab-list").scrollBy({
      left: -200,
      behavior: "smooth",
    });
  });

  document.getElementById("scroll-right").addEventListener("click", function () {
    document.querySelector(".tab-list").scrollBy({
      left: 200,
      behavior: "smooth",
    });
  });
});
