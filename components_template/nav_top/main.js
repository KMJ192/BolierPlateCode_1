const toggleBtn = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');
const searchBox = document.querySelector('.search-container');
const userMenu = document.querySelector('.user-option-container');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    searchBox.classList.toggle('active');
    userMenu.classList.toggle('active');
});

window.onclick = function(event) {
    if(!event.target.matches('.user-image')){
        const dropdowns = document.getElementsByClassName("user-menu");
        for(let i = 0; i < dropdowns.length; i++){
            const openDropdown = dropdowns[i];
            if(openDropdown.classList.contains("show")){
                openDropdown.classList.remove("show");
            }
        }
    }
}