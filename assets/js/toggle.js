const toggle = document.querySelector(".toggleSwitch");

let currentTheme = localStorage.getItem('theme');
let isDarkMode = false;
if (currentTheme) {
    isDarkMode = currentTheme === 'dark';
} else {
    isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches;
}

let setDarkMode = (isDark) => {
  toggle.checked = !(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'default');
  if(isDark) { 
    toggle.classList.add('active');
    window.document.body.classList.add('dark');
    window.document.querySelectorAll('a').forEach(v => v.classList.add('dark'));
    window.document.querySelectorAll('span').forEach(v => v.classList.add('dark'));
    window.document.querySelector('nav').classList.add('dark');
    window.document.querySelector('footer').classList.add('dark');
  } else {
    toggle.classList.remove('active');
    window.document.body.classList.remove('dark');
    window.document.querySelectorAll('a').forEach(v => v.classList.remove('dark'));
    window.document.querySelectorAll('span').forEach(v => v.classList.remove('dark'));
    window.document.querySelector('nav').classList.remove('dark');
    window.document.querySelector('footer').classList.remove('dark');
  }
}

let toggleThemeBtn = document.getElementById("toggle_dark_theme");
if (toggle) {
  toggle.checked = isDarkMode;
  isDarkMode ? toggle.click() : "";
  setDarkMode(isDarkMode);
}

toggle.onclick = (e) => {
    if(typeof e.target.checked != "undefined") {
      setDarkMode(e.target.checked);
    } else {
      return false;
    }
}