// js/main.js

// Ініціалізація Swiper
const swiper = new Swiper('.about__slider', {
    // Основні налаштування
    slidesPerView: 3,       // Скільки слайдів показувати (на комп'ютері)
    spaceBetween: 30,       // Відступ між слайдами (30px)
    loop: true,             // Нескінченна прокрутка (після останнього йде перший)
    
    // Налаштування пагінації (крапки знизу)
    pagination: {
        el: '.swiper-pagination',
        clickable: true,    // Щоб можна було клікати по крапках
    },

    // Адаптивність (якщо екран менший)
    breakpoints: {
        // Коли ширина екрану >= 320px (мобільні)
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        // Коли ширина екрану >= 768px (планшети)
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // Коли ширина екрану >= 1024px (ноутбуки та ПК)
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});