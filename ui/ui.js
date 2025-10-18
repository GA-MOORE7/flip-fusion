const buttons = document.querySelectorAll('.toggle-btn');
const slider = document.querySelector('.slider');
const pages = document.querySelectorAll('.page');
const sliderColors = ['#499fa4', '#E9BC8B', '#3D4A55'];

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // move slider
    slider.style.left = `${index * 33.33}%`;
    slider.style.backgroundColor = sliderColors[index];

    // highlight active button
    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    // show correct page
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(button.dataset.page).classList.add('active');
  });
});

// Show first page by default
buttons[0].click();