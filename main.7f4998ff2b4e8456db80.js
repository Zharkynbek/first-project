(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{KgCJ:function(e,t,n){var o=n("mp5j");e.exports=(o.default||o).template({compiler:[8,">= 4.3.0"],main:function(e,t,n,o,r){return'<h1 class="title">Login</h1>\r\n<form class="modal-form" action="submit">\r\n    <label class="label">\r\n        Введите логин\r\n        <input value="user@mail.com" type="text">\r\n    </label>\r\n    <label class="label">\r\n        Введите пароль\r\n        <input value="12345678" autocomplete="off" type="password">\r\n    </label>\r\n    <button class="button">JOIN</button>\r\n</form>'},useData:!0})},L1EO:function(e,t,n){},QfWi:function(e,t,n){"use strict";n.r(t);n("lYjL"),n("8cZI"),n("lmye"),n("D/wG"),n("JBxO"),n("JjHl"),n("FdtR"),n("L1EO");var o,r,a=n("QJ3N"),l=(n("bzha"),n("zrP5"),n("jffb"),n("qGUI")),c=n.n(l),u=n("vWpW"),i=n.n(u),m=n("KgCJ"),s=n.n(m),d=n("nGP0"),p=n.n(d),f={form:document.querySelector(".comment-form"),nameInput:document.querySelector(".name"),commentInput:document.querySelector(".comment"),commentsList:document.querySelector(".comments"),loginBtn:document.querySelector(".log-btn "),formBtn:document.querySelector(".submit-form")};function b(e){(e.preventDefault(),""!==document.querySelector(".name").value)?""!==document.querySelector(".comment").value?function(e){fetch("https://firstproject-b95dd-default-rtdb.europe-west1.firebasedatabase.app/comments.json",{method:"POST",body:JSON.stringify(e),headers:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(t){return e.id=t.name,e})).then(y).then(h)}({date:new Date(Date.now()).toLocaleDateString()+" "+new Date(Date.now()).toLocaleTimeString(),name:document.querySelector(".name").value,comment:document.querySelector(".comment").value}):Object(a.error)({text:"input for comment is empty",delay:1e3}):Object(a.error)({text:"input for name is empty",delay:1e3})}function y(e){var t=v();t.push(e),localStorage.setItem("comments",JSON.stringify(t))}function v(){return JSON.parse(localStorage.getItem("comments")||"[]")}function h(){var e=v();document.querySelector(".name").value="",document.querySelector(".comment").value="";var t=e.map((function(e){return'<li id="'+e.id+'">  \n      <h3>'+e.name+"</h3>\n      <p>"+e.date+"</p>\n      <p>"+e.comment+'</p>\n      <button class="delete">delete</button>\n    </li>'})).join("");document.querySelector(".comments").innerHTML=t}function g(e){if("button"===e.target.localName){var t=v().filter((function(t){return t.id!==e.target.parentNode.id}));localStorage.setItem("comments",JSON.stringify(t)),h()}}function S(){(r=document.createElement("div")).classList.add("login");var e=s()();mui.overlay("on",r),r.innerHTML=e,document.querySelector(".modal-form").addEventListener("submit",L,{once:!0})}function L(e){e.preventDefault();var t=e.target[0].value,n=e.target[1].value;console.dir(n),function(e,t){return fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCniRY8mOu8mbV8PRMWbZHKAGJrPGGPrL8",{method:"POST",body:JSON.stringify({email:e,password:t,returnSecureToken:!0}),headers:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(e){return e.idToken}))}(t,n).then(q).catch((function(e){return e}))}function w(){(o=document.createElement("div")).classList.add("login");var e=p()();o.innerHTML=e,mui.overlay("on",o),document.querySelector(".modal-reg-form").addEventListener("submit",j,{once:!0})}function j(e){e.preventDefault();var t=e.target[0].value,n=e.target[1].value;n===e.target[2].value?(alert("vy uspeshno proshli registraciyu"),function(e,t){fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCniRY8mOu8mbV8PRMWbZHKAGJrPGGPrL8",{method:"POST",body:JSON.stringify({email:e,password:t,returnSecureToken:!0}),header:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(e){return e.idToken}))}(t,n)):alert("nevernyi parol")}function q(e){return e?fetch("https://firstproject-b95dd-default-rtdb.europe-west1.firebasedatabase.app/comments.json?auth="+e).then((function(e){return e.json()})).then((function(e){var t=Object.values(e);mui.overlay("off",r),document.body.innerHTML=c()(t),document.querySelector(".logout").addEventListener("click",O)})):Promise.reject(alert("Вы не авторизированы"))}function O(){document.body.innerHTML=i()(),window.addEventListener("load",h),document.querySelector(".comment-form").addEventListener("submit",b),document.querySelector(".log-btn").addEventListener("click",S),h(),document.querySelector(".comments").addEventListener("click",g),document.querySelector(".reg-btn").addEventListener("click",w)}f.form.addEventListener("submit",b),window.addEventListener("load",h),f.commentsList.addEventListener("click",g),f.loginBtn.addEventListener("click",S),document.querySelector(".reg-btn").addEventListener("click",w)},nGP0:function(e,t,n){var o=n("mp5j");e.exports=(o.default||o).template({compiler:[8,">= 4.3.0"],main:function(e,t,n,o,r){return'<h1 class="title">Registration</h1>\r\n<form class="modal-reg-form comment-form" action="submit">\r\n    <label class="label">\r\n        Введите логин\r\n        <input type="text">\r\n    </label>\r\n    <label class="label">\r\n        Введите пароль\r\n        <input autocomplete="off" type="password">\r\n    </label>\r\n    <label class="label">\r\n        povtorite пароль\r\n        <input autocomplete="off" type="password">\r\n    </label>\r\n    <button class="submit-form">Submit</button>\r\n</form>'},useData:!0})},qGUI:function(e,t,n){var o=n("mp5j");e.exports=(o.default||o).template({1:function(e,t,n,o,r){var a,l=null!=t?t:e.nullContext||{},c=e.hooks.helperMissing,u=e.escapeExpression,i=e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]};return"        <li>\r\n            <h3>"+u("function"==typeof(a=null!=(a=i(n,"name")||(null!=t?i(t,"name"):t))?a:c)?a.call(l,{name:"name",hash:{},data:r,loc:{start:{line:7,column:16},end:{line:7,column:24}}}):a)+"</h3>\r\n            <p>"+u("function"==typeof(a=null!=(a=i(n,"date")||(null!=t?i(t,"date"):t))?a:c)?a.call(l,{name:"date",hash:{},data:r,loc:{start:{line:8,column:15},end:{line:8,column:23}}}):a)+"</p>\r\n            <p>"+u("function"==typeof(a=null!=(a=i(n,"comment")||(null!=t?i(t,"comment"):t))?a:c)?a.call(l,{name:"comment",hash:{},data:r,loc:{start:{line:9,column:15},end:{line:9,column:26}}}):a)+"</p>\r\n        </li>\r\n"},compiler:[8,">= 4.3.0"],main:function(e,t,n,o,r){var a;return'<div>\r\n    <h1 class="serverComments">Comments</h1>\r\n    <button class="mui-btn mui-btn--primary logout">Logout</button>\r\n    <ol>\r\n'+(null!=(a=(e.lookupProperty||function(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e[t]})(n,"each").call(null!=t?t:e.nullContext||{},t,{name:"each",hash:{},fn:e.program(1,r,0),inverse:e.noop,data:r,loc:{start:{line:5,column:8},end:{line:11,column:17}}}))?a:"")+"    </ol>\r\n</div>"},useData:!0})},vWpW:function(e,t,n){var o=n("mp5j");e.exports=(o.default||o).template({compiler:[8,">= 4.3.0"],main:function(e,t,n,o,r){return'<button class="mui-btn mui-btn--flat mui-btn--primary log-btn">Login</button>\r\n<button class="mui-btn mui-btn--flat mui-btn--primary reg-btn">Registration</button>\r\n<div class="main">\r\n    <h1>Firebase</h1>\r\n    <form class="comment-form" action="submit">\r\n        <label>\r\n            <p>Name:</p>\r\n            <input type="text" class="name">\r\n        </label>\r\n        <label>\r\n            <p>Comment:</p>\r\n            <textarea rows="10" cols="40" class="comment" type="text" style="resize: none"></textarea>\r\n        </label>\r\n        <button class="submit-form">SEND</button>\r\n    </form>\r\n</div>\r\n<ul class="comments"></ul>'},useData:!0})}},[["QfWi",1,2]]]);
//# sourceMappingURL=main.7f4998ff2b4e8456db80.js.map