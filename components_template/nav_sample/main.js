const toggleBtn = document.querySelector('.navbar-toggle-btn')
const menu = document.querySelector('.navbar-menu')

toggleBtn.addEventListener('click', () =>{
    menu.classList.toggle('active');
});