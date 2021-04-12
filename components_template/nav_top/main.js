const toggleBtn = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');
const searchBox = document.querySelector('.search-container');
const userMenu = document.querySelector('.user-option-container');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    searchBox.classList.toggle('active');
    userMenu.classList.toggle('active');
});