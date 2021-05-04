//AIzaSyCniRY8mOu8mbV8PRMWbZHKAGJrPGGPrL8

import './styles.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
import commentsPage from './template/commentsPage.hbs';
import mainPage from './template/mainPage.hbs';
import createForm from './template/createForm.hbs';
import registrationForm from './template/registrationForm.hbs';

const refs = {
  form: document.querySelector('.comment-form'),
  nameInput: document.querySelector('.name'),
  commentInput: document.querySelector('.comment'),
  commentsList: document.querySelector('.comments'),
  loginBtn: document.querySelector('.log-btn '),
  formBtn: document.querySelector('.submit-form'),
};

refs.form.addEventListener(
  'submit',
  sendRequest,
  // debounce(sendRequest, 500, { leading: true, trailing: false }),
  // false,
);
window.addEventListener('load', renderComments);
refs.commentsList.addEventListener('click', deleteComment);
refs.loginBtn.addEventListener('click', openModalLog);
document.querySelector('.reg-btn').addEventListener('click', openRegForm);

let regModalEl;
let modalEl;

// ===================== sendComments ============================

function sendComments(comment) {
  return fetch(
    'https://firstproject-b95dd-default-rtdb.europe-west1.firebasedatabase.app/comments.json',
    {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'content-type': 'application/json',
      },
    },
  )
    .then(resp => resp.json())
    .then(data => {
      comment.id = data.name;
      return comment;
    })
    .then(addToLocal)
    .then(renderComments);
}

// ================== sendRequest ============================

function sendRequest(e) {
  e.preventDefault();

  if (document.querySelector('.name').value === '') {
    error({
      text: 'input for name is empty',
      delay: 1000,
    });
    return;
  }

  if (document.querySelector('.comment').value === '') {
    error({
      text: 'input for comment is empty',
      delay: 1000,
    });
    return;
  }

  const comment = {
    date: `${new Date(Date.now()).toLocaleDateString()} ${new Date(
      Date.now(),
    ).toLocaleTimeString()}`,
    name: document.querySelector('.name').value,
    comment: document.querySelector('.comment').value,
  };
  sendComments(comment);
}

// =========================== addToLocal =================================

function addToLocal(comment) {
  const commentsArr = getCommentsFromLocal();
  commentsArr.push(comment);
  localStorage.setItem('comments', JSON.stringify(commentsArr));
}

function getCommentsFromLocal() {
  return JSON.parse(localStorage.getItem('comments') || '[]');
}

// ==================== renderComments ============================

function renderComments() {
  const commentArr = getCommentsFromLocal();
  document.querySelector('.name').value = '';
  document.querySelector('.comment').value = '';
  const markup = commentArr
    .map(el => {
      return `<li id="${el.id}">  
      <h3>${el.name}</h3>
      <p>${el.date}</p>
      <p>${el.comment}</p>
      <button class="delete">delete</button>
    </li>`;
    })
    .join('');
  document.querySelector('.comments').innerHTML = markup;
}

// ==================== deleteComment ============================

function deleteComment(e) {
  if (e.target.localName !== 'button') {
    return;
  }
  const filteredComments = getCommentsFromLocal().filter(el => {
    return el.id !== e.target.parentNode.id;
  });
  localStorage.setItem('comments', JSON.stringify(filteredComments));
  renderComments();
}

// ========================= openModalLog ===========================
function openModalLog() {
  modalEl = document.createElement('div');
  modalEl.classList.add('login');
  const formMarkup = createForm();
  mui.overlay('on', modalEl);
  modalEl.innerHTML = formMarkup;
  document
    .querySelector('.modal-form')
    .addEventListener('submit', onSubmitLog, { once: true });
}

//==================== onSubmitLog ===========================

function onSubmitLog(e) {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  console.dir(password);

  loginUser(email, password)
    .then(getData)
    .catch(error => error);
}

//==================== loginUser =================================

function loginUser(email, password) {
  const API_KEY = 'AIzaSyCniRY8mOu8mbV8PRMWbZHKAGJrPGGPrL8';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        'content-type': 'application/json',
      },
    },
  )
    .then(resp => resp.json())
    .then(data => data.idToken);
}

// ============= openRefForm ==============

function openRegForm() {
  regModalEl = document.createElement('div');
  regModalEl.classList.add('login');
  const formMarkup = registrationForm();
  regModalEl.innerHTML = formMarkup;
  mui.overlay('on', regModalEl);
  document
    .querySelector('.modal-reg-form')
    .addEventListener('submit', onSubmitReg, { once: true });
}

// ================= onSubmitReg =============

function onSubmitReg(e) {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  const repeatPassword = e.target[2].value;
  if (password === repeatPassword) {
    alert('vy uspeshno proshli registraciyu');
    regUser(email, password);
  } else {
    alert('nevernyi parol');
  }
}
// ============= regUser ===================

function regUser(email, password) {
  const apiKey = 'AIzaSyCniRY8mOu8mbV8PRMWbZHKAGJrPGGPrL8';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      header: {
        'content-type': 'application/json',
      },
    },
  )
    .then(resp => resp.json())
    .then(data => data.idToken);
}

// ============= getData ===================

function getData(token) {
  if (!token) {
    return Promise.reject(alert('Вы не авторизированы'));
  }
  return fetch(
    `https://firstproject-b95dd-default-rtdb.europe-west1.firebasedatabase.app/comments.json?auth=${token}`,
  )
    .then(resp => resp.json())
    .then(data => {
      const arrData = Object.values(data);
      mui.overlay('off', modalEl);
      document.body.innerHTML = commentsPage(arrData);
      document.querySelector('.logout').addEventListener('click', logOut);
    });
}

//=================== logOut ============================

function logOut() {
  document.body.innerHTML = mainPage();
  window.addEventListener('load', renderComments);
  document
    .querySelector('.comment-form')
    .addEventListener('submit', sendRequest);
  document.querySelector('.log-btn').addEventListener('click', openModalLog);
  renderComments();
  document.querySelector('.comments').addEventListener('click', deleteComment);
  // document.querySelector('.delete').addEventListener('click', deleteComment);
  document.querySelector('.reg-btn').addEventListener('click', openRegForm);
}
