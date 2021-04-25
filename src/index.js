//AIzaSyCniRY8mOu8mbV8PRMWbZHKAGJrPGGPrL8

import './styles.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';

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

  if (refs.nameInput.value === '') {
    error({
      text: 'input is empty',
      delay: 1000,
    });
    return;
  }

  if (refs.commentInput.value === '') {
    error({
      text: 'input is empty',
      delay: 1000,
    });
    return;
  }

  const comment = {
    date: `${new Date(Date.now()).toLocaleDateString()} ${new Date(
      Date.now(),
    ).toLocaleTimeString()}`,
    name: refs.nameInput.value,
    comment: refs.commentInput.value,
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
  refs.nameInput.value = '';
  refs.commentInput.value = '';
  const markup = commentArr
    .map(el => {
      return `<li id="${el.id}">  
      <h3>${el.name}</h3>
      <p>${el.date}</p>
      <p>${el.comment}</p>
      <button>delete</button>
    </li>`;
    })
    .join('');
  refs.commentsList.innerHTML = markup;
}

window.addEventListener('load', renderComments);

refs.commentsList.addEventListener('click', deleteComment);

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
