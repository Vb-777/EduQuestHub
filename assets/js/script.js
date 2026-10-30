/* EduQuestHub – shared front-end script
 * Loaded by every page, so every function checks that the elements it
 * needs exist before touching them.
 */

// ---------- Home page: reveal the About section on scroll ----------
function scrollAppear() {
  var introText = document.querySelector('.side-text');
  var sideImage = document.querySelector('.sideImage');
  var screenPosition = window.innerHeight / 1.2;

  if (introText && introText.getBoundingClientRect().top < screenPosition) {
    introText.classList.add('side-text-appear');
  }
  if (sideImage && sideImage.getBoundingClientRect().top < screenPosition) {
    sideImage.classList.add('sideImage-appear');
  }
}
window.addEventListener('scroll', scrollAppear);
window.addEventListener('load', scrollAppear);

// ---------- Sub-pages: mobile navigation toggle ----------
function switchTAB() {
  var list = document.getElementById('list-switch');
  if (!list) return;
  var open = list.dataset.open === 'true';
  list.style.cssText = open ? 'display: none;' : 'display: grid; height: 50vh; margin-left: 5%;';
  list.dataset.open = String(!open);
}

// ---------- Home page: side menu ----------
function sideMenu(side) {
  var menu = document.getElementById('side-menu');
  if (!menu) return;
  menu.style.cssText = side === 0
    ? 'transform: translateX(0); position: fixed;'
    : 'transform: translateX(-100%);';
}

// ---------- Login page: switch between Log In and Register ----------
function login() {
  var x = document.getElementById('login'), y = document.getElementById('register'),
      z = document.getElementById('btn'), w = document.getElementById('other'),
      a = document.getElementById('log'), b = document.getElementById('reg');
  if (!x || !y) return;
  x.style.left = '50px';
  y.style.left = '450px';
  z.style.left = '0px';
  w.style.visibility = 'visible';
  a.style.color = '#fff';
  b.style.color = '#000';
}

function register() {
  var x = document.getElementById('login'), y = document.getElementById('register'),
      z = document.getElementById('btn'), w = document.getElementById('other'),
      a = document.getElementById('log'), b = document.getElementById('reg');
  if (!x || !y) return;
  x.style.left = '-400px';
  y.style.left = '50px';
  z.style.left = '110px';
  w.style.visibility = 'hidden';
  b.style.color = '#fff';
  a.style.color = '#000';
}

// Enable the Register button only after Terms & Conditions are accepted
function goFurther() {
  var chk = document.getElementById('chkAgree');
  var btn = document.getElementById('btnSubmit');
  if (!chk || !btn) return;
  btn.disabled = !chk.checked;
  btn.style.background = chk.checked ? 'linear-gradient(to right, #FA4B37, #DF2771)' : 'lightgray';
}

function google() {
  window.open('https://accounts.google.com/', '_blank');
}

// Client-side form validation (there is no backend yet – see README roadmap)
document.addEventListener('DOMContentLoaded', function () {
  var loginForm = document.getElementById('login');
  var registerForm = document.getElementById('register');
  if (!loginForm || !registerForm) return;

  goFurther();

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showFormMessage('Login is a front-end demo – redirecting to the home page…', false);
    setTimeout(function () { window.location.href = 'index.html'; }, 1200);
  });

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var pw = document.getElementById('regPassword').value;
    var confirmPw = document.getElementById('regConfirm').value;
    if (pw.length < 8) return showFormMessage('Password must be at least 8 characters.', true);
    if (pw !== confirmPw) return showFormMessage('Passwords do not match.', true);
    showFormMessage('Registration validated (front-end demo). Please log in.', false);
    registerForm.reset();
    goFurther();
    login();
  });
});

function showFormMessage(text, isError) {
  var box = document.getElementById('form-message');
  if (!box) return;
  box.textContent = text;
  box.style.color = isError ? '#c0392b' : '#1e7e34';
}

// ---------- Quiz page: switch between embedded quizzes ----------
function quizt(frame) {
  var frames = document.querySelectorAll('#quiz-container > div');
  var target = document.getElementById('f' + frame);
  if (!target) return;
  frames.forEach(function (f) { f.style.display = 'none'; });
  target.style.display = 'block';
  document.querySelectorAll('#left li').forEach(function (li) {
    li.classList.toggle('active', li.dataset.frame === String(frame));
  });
}
