// Переключение темы
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  body.classList.toggle('dark-theme');
});

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
  });
});

// Логика кнопки "Найти машину"
const findCarButton = document.getElementById('find-car');
findCarButton.addEventListener('click', () => {
  const result = document.getElementById('result');

  // Считываем значения
  const brand = document.getElementById('car-brand').value;
  const color = document.getElementById('car-color').value;
  const gearbox = document.getElementById('car-gearbox').value;
  const fuel = document.getElementById('car-fuel').value;
  const body = document.getElementById('car-body').value;
  const drivetrain = document.getElementById('car-drive').value;  // Здесь изменили id на car-drive
  const steeringWheel = document.getElementById('car-wheel').value;

  // Диапазон цены
  const priceFrom = document.getElementById('price-from').value;
  const priceTo = document.getElementById('price-to').value;
  const priceRange = priceFrom || priceTo
    ? `от ${priceFrom || '0'} до ${priceTo || '∞'}`
    : '';

  // Диапазон годов
  const yearFrom = document.getElementById('year-from').value;
  const yearTo = document.getElementById('year-to').value;
  const yearRange = yearFrom || yearTo
    ? `от ${yearFrom || '1900'} до ${yearTo || '2024'}`
    : '';

  // Объём двигателя
  const engineFrom = document.getElementById('engine-from').value;
  const engineTo = document.getElementById('engine-to').value;
  const engineRange = engineFrom || engineTo
    ? `от ${engineFrom || '0.1'} до ${engineTo || '9.9'}`
    : '';

  // Если не выбрано ни одного параметра, показываем ошибку
  if (!brand && !color && !gearbox && !fuel && !body && !drivetrain && !steeringWheel && !priceRange && !yearRange && !engineRange) {
    result.textContent = 'Ошибка: выберите хотя бы один параметр!';
    result.style.color = 'red';
    return;
  }

  // Отображаем результат
  result.textContent = `Вы подобрали машину:
    Марка: ${brand || 'не выбрано'}, Год: ${yearRange || 'не выбрано'}, Цена: ${priceRange || 'не выбрано'}, 
    Коробка: ${gearbox || 'не выбрано'}, Кузов: ${body || 'не выбрано'}, Топливо: ${fuel || 'не выбрано'},
    Объём двигателя: ${engineRange || 'не выбрано'}, Привод: ${drivetrain || 'не выбрано'}, Цвет: ${color || 'не выбрано'}`;
  result.style.color = 'black';
});

// Логика кнопки "Сбросить"
const resetButton = document.getElementById('reset-selection');
resetButton.addEventListener('click', () => {
  document.querySelectorAll('select').forEach(select => {
    select.value = '';
  });

  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.value = '';
  });

  const result = document.getElementById('result');
  result.textContent = '';
  result.style.color = 'black';
});
