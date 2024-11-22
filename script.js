// Переключение темы
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  body.classList.toggle('dark-theme');
});
// Звук проезжающей машины (опционально)
document.addEventListener("DOMContentLoaded", () => {
  const audio = new Audio("car-drive-by.mp3"); // Замените на имя вашего файла
  audio.volume = 0.8;
  audio.play();
});


// Логика вкладок
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Удаляем активный класс у всех вкладок и панелей
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    // Добавляем активный класс выбранной вкладке и её панели
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Автообновление выбранных параметров
document.querySelectorAll('select').forEach(select => {
  select.addEventListener('change', event => {
    const display = document.getElementById(`selected-${event.target.id.split('-')[1]}`);
    if (display) {
      const selectedValue = event.target.value;
      // Если ничего не выбрано, скрываем элемент
      if (!selectedValue) {
        display.textContent = '';
        display.style.display = 'none';
      } else {
        // Иначе показываем выбранное значение
        display.textContent = `Выбрано: ${event.target.options[event.target.selectedIndex].text}`;
        display.style.display = 'block';
      }
    }
  });
});

// Найти машину
const findCarButton = document.getElementById('find-car');
findCarButton.addEventListener('click', () => {
  const result = document.getElementById('result');
  const selects = document.querySelectorAll('select');

  const selectedValues = Array.from(selects).map(select => select.value);
  const isAnySelected = selectedValues.some(value => value);

  if (!isAnySelected) {
    result.textContent = 'Ошибка: выберите хотя бы одну характеристику машины!';
    result.style.color = 'red';
    return;
  }

  const color = document.getElementById('car-color').value || 'не выбрано';
  const brand = document.getElementById('car-brand').value || 'не выбрано';
  const speed = document.getElementById('car-speed').value || 'не выбрано';
  const price = document.getElementById('car-price').value || 'не выбрано';
  const engine = document.getElementById('car-engine').value || 'не выбрано';
  const gearbox = document.getElementById('car-gearbox').value || 'не выбрано';
  const wheel = document.getElementById('car-wheel').value || 'не выбрано';

  result.textContent = `Вы подобрали машину: 
  Цвет: ${color}, Марка: ${brand}, Скорость: ${speed}, Цена: ${price}, 
  Двигатель: ${engine}, Коробка: ${gearbox}, Руль: ${wheel}`;
  result.style.color = 'black';
});

// Сброс параметров
const resetButton = document.getElementById('reset-selection');
resetButton.addEventListener('click', () => {
  document.querySelectorAll('select').forEach(select => {
    select.value = '';
    const display = document.getElementById(`selected-${select.id.split('-')[1]}`);
    if (display) {
      display.textContent = '';
      display.style.display = 'none';
    }
  });

  const result = document.getElementById('result');
  result.textContent = '';
  result.style.color = 'black';
});
