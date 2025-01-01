// Получаем элементы
const slides = document.querySelectorAll('.slider-content'); // Все слайды
const prevBtn = document.querySelector('.prev'); // Кнопка "назад"
const nextBtn = document.querySelector('.next'); // Кнопка "вперёд"
const indicators = document.querySelectorAll('.indicator'); // Индикаторы

let currentSlide = 0; // Текущий индекс слайда
let slideInterval; // Переменная для интервала

// Функция для показа слайда
// Функция для показа слайда
function showSlide(index) {
    // Скрываем все слайды
    slides.forEach((slide) => slide.style.display = 'none');
    // Удаляем класс active у всех индикаторов и сбрасываем прогресс
    indicators.forEach((indicator) => {
        indicator.classList.remove('active');
        const progressBar = indicator.querySelector('.progress');
        progressBar.style.transition = 'none'; // Убираем анимацию
        progressBar.style.width = '0%'; // Сбрасываем ширину
    });

    // Показываем только текущий слайд
    slides[index].style.display = 'flex';
    // Активируем текущий индикатор
    const activeIndicator = indicators[index];
    activeIndicator.classList.add('active');
    const activeProgressBar = activeIndicator.querySelector('.progress');

    // Используем небольшую задержку, чтобы включить анимацию
    setTimeout(() => {
        activeProgressBar.style.transition = 'width 5s linear'; // Включаем анимацию
        activeProgressBar.style.width = '100%'; // Заполняем прогресс
    }, 10); // Задержка для сброса состояния
}

// Обработчик для кнопки "назад"
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Цикличный переход
    resetInterval();
    showSlide(currentSlide);
});

// Обработчик для кнопки "вперёд"
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length; // Цикличный переход
    resetInterval();
    showSlide(currentSlide);
});

// Инициализация: показываем первый слайд
showSlide(currentSlide);

// Функция для автоматического переключения
function autoSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Переход к следующему слайду
    showSlide(currentSlide);
}

// Запускаем автопереключение
function startInterval() {
    slideInterval = setInterval(autoSlide, 5000); // Смена каждые 5 секунд
}

// Сбрасываем и запускаем заново автопереключение
function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

// Начинаем автопереключение
startInterval();
