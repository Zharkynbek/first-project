//AIzaSyCniRY8mOu8mbV8PRMWbZHKAGJrPGGPrL8

import './styles.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';
import commentsPage from './template/commentsPage.hbs';
import mainPage from './template/mainPage.hbs';

const refs = {
  form: document.querySelector('.comment-form'),
  nameInput: document.querySelector('.name'),
  commentInput: document.querySelector('.comment'),
  commentsList: document.querySelector('.comments'),
  loginBtn: document.querySelector('.log-btn '),
  formBtn: document.querySelector('.submit-form'),
};

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

refs.form.addEventListener(
  'submit',
  debounce(sendRequest, 500, { leading: true, trailing: false }),
  false,
);

function addToLocal(comment) {
  const commentsArr = getCommentsFromLocal();
  commentsArr.push(comment);
  localStorage.setItem('comments', JSON.stringify(commentsArr));
}

function getCommentsFromLocal() {
  return JSON.parse(localStorage.getItem('comments') || '[]');
}

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

window.addEventListener('load', renderComments);

refs.commentsList.addEventListener('click', deleteComment);

function deleteComment(e) {
  if (e.target.nodeName !== 'BUTTON') {
    console.log('heko');
    return;
  }
  const filteredComments = getCommentsFromLocal().filter(el => {
    return el.id !== e.target.parentNode.id;
  });
  localStorage.setItem('comments', JSON.stringify(filteredComments));
  renderComments();
}

refs.loginBtn.addEventListener('click', openModalLog);

let modalEl;
function openModalLog() {
  modalEl = document.createElement('div');
  modalEl.classList.add('login');

  // show modal
  mui.overlay('on', modalEl);

  const formMarkup = `<h1 class="title">Sign In</h1>
  <form class="modal-form" action="submit">
  <label class="label">
  <p>Login</p>
  <input type="text" value="user@mail.com">
  </label>
  <label class="label">
  <p>Password</p>
  <input type="password" value="12345678">
  </label>
  <button class="button">Join</button>
  </form>
  `;
  modalEl.innerHTML = formMarkup;
  document.querySelector('.modal-form').addEventListener('submit', onSubmitLog);
}

function onSubmitLog(e) {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  loginUser(email, password).then(getData);
}

function loginUser(email, password) {
  const API_KEY = 'AIzaSyCniRY8mOu8mbV8PRMWbZHKAGJrPGGPrL8';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}
`,
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

function logOut() {
  document.body.innerHTML = mainPage();
  document
    .querySelector('.comment-form')
    .addEventListener('submit', sendRequest);
  document.querySelector('.log-btn').addEventListener('click', openModalLog);
  renderComments();

  document.querySelector('.delete').addEventListener('click', e => {
    console.log('hello');
    deleteComment(e);
  });
}
